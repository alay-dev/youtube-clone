import React from 'react' ;
import { Router, Route } from 'react-router-dom' ;

import Header from './header/Header' ;
import Sidenav from './Sidenav' ;
import Body from './body/Body' ;
import './App.css' ;
import {search} from '../apis/youtube' ;
import SearchResult from './searchResult/SearchResult';
import WatchVideo from './watchVideo/WatchVideo' ;
import history from '../history' ;
 
class App extends React.Component {
    state = { videos: [], selectedVideo: null } ;

    componentDidMount() {
        this.onTermSubmit('') ;
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video }) ;
    } ;

    onTermSubmit = async (term ) => {
        const response = await search.get('/search', {
            params: {
                part: 'snippet',
                q: term
            }
        }) ;

        this.setState({
            videos: response.data.items
        });

        // Channel DP Fetching
        await this.getChannelImg(response) ;

        // Video Duration Fetching
        await this.getVideoDuration(response) ;

        // Video Views Fetching
        await this.getVideoStats(response) ;

        await this.getVideoPublished(response) ;
    };

    getChannelImg = async (response) => {
        const channelIds = response.data.items.map( item => {
            return item.snippet.channelId ;
        }) ;
        
        let urls = await Promise.all(channelIds.map(async id => {
            return await search.get('/channels', {
                params: {
                    part: 'snippet',
                    id: id
                }
            }); 
        }));

        urls = urls.map(url => {
            return url.data.items[0].snippet.thumbnails.high.url ;
        })
        
        const channelImg = response.data.items.map( (item,i) => {
            return {...item, channelImg: urls[i++]} ;
        }) ;

        this.setState({ videos: channelImg}) ;
    };

    getVideoDuration = async (response) => {
        let videoIds = response.data.items.map( item => {
            if(item.id.videoId) {
                return item.id.videoId ;
            }
            return undefined;
        });

        videoIds = videoIds.filter(item => item !== undefined) ;

        let durations = await Promise.all(videoIds.map(async id => {
            return await search.get('/videos', {
                params:{
                    part: 'contentDetails',
                    id: id
                }
            });
        }));

        durations = durations.map( duration => {
            if(duration.data.items[0].contentDetails.duration.startsWith('PT')) {
                return duration.data.items[0].contentDetails.duration.split('PT')[1].replace(/(H|M)/g, ':').replace('S', '') ;
            }
            return '...' ;
        });

        this.setState({ videos: this.state.videos.map((item, i) => {
            return {...item, videoDuration: durations[i++]} ;
        })});
    };

    getVideoStats = async (response) => {
        let videoIds = response.data.items.map( item => {
            if(item.id.videoId) {
                return item.id.videoId ;
            }
            return undefined;
        });

        videoIds = videoIds.filter(item => item !== undefined) ;

        const data = await Promise.all(videoIds.map(async id => {
            return await search.get('/videos', {
                params:{
                    part: 'statistics',
                    id: id
                }
            });
        }));

        const views = data.map(view => {
            let tmp =  view.data.items[0].statistics.viewCount ;
            if(tmp >= 1000000000 ){
                return `${Math.floor(tmp/1000000000)}B` ;
            }
            else if(tmp >=1000000) {
                return `${Math.floor(tmp/1000000)}M` ;
            }
            else if(tmp >=1000) {
                return `${Math.floor(tmp/1000)}K` ;
            }
            else {
                return tmp ;
            }
        });

        const comments = data.map( comment => {
            let tmp= comment.data.items[0].statistics.commentCount ;
            if(tmp >= 1000000000 ){
                return `${Math.floor(tmp/1000000000)}B` ;
            }
            else if(tmp >=1000000) {
                return `${Math.floor(tmp/1000000)}M` ;
            }
            else if(tmp >=1000) {
                return `${Math.floor(tmp/1000)}K` ;
            }
            else {
                return tmp ;
            }
        });

        const likes = data.map( comment => {
            let tmp = comment.data.items[0].statistics.likeCount ;
            if(tmp >= 1000000000 ){
                return `${Math.floor(tmp/1000000000)}B` ;
            }
            else if(tmp >=1000000) {
                return `${Math.floor(tmp/1000000)}M` ;
            }
            else if(tmp >=1000) {
                return `${Math.floor(tmp/1000)}K` ;
            }
            else {
                return tmp ;
            }
        });

        const dislikes = data.map( comment => {
            let tmp = comment.data.items[0].statistics.dislikeCount ;
            if(tmp >= 1000000000 ){
                return `${Math.floor(tmp/1000000000)}B` ;
            }
            else if(tmp >=1000000) {
                return `${Math.floor(tmp/1000000)}M` ;
            }
            else if(tmp >=1000) {
                return `${Math.floor(tmp/1000)}K` ;
            }
            else {
                return tmp ;
            }
        });

        this.setState({ videos: this.state.videos.map((item, i) => {
            return {...item, viewCount: views[i++], likeCount: likes[i++], dislikeCount: dislikes[i++], commentCount: comments[i++]} ;
        })});
        
    };

    getVideoPublished = async (response) => {
        let publishedTimes = response.data.items.map( item => {
            if(item.snippet.publishedAt) {
                return item.snippet.publishedAt ;
            }
            return undefined;
        });

        publishedTimes = publishedTimes.filter(item => item !== undefined) ;

        const times = publishedTimes.map(item => {
            const d1 = new Date(item) ;
            const d2 = new Date() ;
            let diff = Math.abs(d2 - d1) ;

            if(diff > 31536000000) {
                return `${Math.floor(diff/31536000000)} years ago` ;
            }
            else if(diff>2592000000){
                return `${Math.floor(diff/2592000000)} months ago` ;
            }
            else if (diff> 604800000) {
                return `${Math.floor(diff/604800000)} weeks ago` ;
            }
            else if (diff> 86400000){
                return `${Math.floor(diff/86400000)} days ago` ;
            }
            else if(diff>3600000) {
                return `${Math.floor(diff/3600000)} hours ago`;
            }
            else if(diff>60000) {
                return `${Math.floor(diff/60000)} minutes ago` ;
            }
            else if(diff>1000) {
                return `${Math.floor(diff/1000)} seconds ago` ;
            }
            else {
                return '1 seconds ago' ;
            }
        }); 
        
        const date = publishedTimes.map(item => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;
            let month = months[new Date(item).getMonth()] ;
            let date = new Date(item).getDate() ;
            let year = new Date(item).getFullYear() ;
            let tmp = `${month} ${date}, ${year}`;
            return tmp ;
        });

        this.setState({videos: this.state.videos.map((item,i) => {
            return {...item, publishedTime: times[i++], date: date[i++] } ;
        })});
    };

    render() {
        return (
            <Router history={history}>
                <div className="layout">
                    <Header onFormSubmit={ this.onTermSubmit } />
                    <div className="main__bodyContainer">
                            <Sidenav />
                            <Route path="/" exact component={()=> <Body videos={this.state.videos} onVideoSelect={this.onVideoSelect} /> }/>
                            <Route path="/search" exact component={()=> <SearchResult videos={this.state.videos} onVideoSelect={this.onVideoSelect} /> }/>
                            <Route path="/watch" exact component={()=><WatchVideo selectedVideo={this.state.selectedVideo} videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App ;