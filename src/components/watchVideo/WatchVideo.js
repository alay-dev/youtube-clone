import React from 'react' ;

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './WatchVideo.css' ;
import history from '../../history' ;

class WatchVideo extends React.Component {

    handleClick = (video) => {
        this.props.onVideoSelect(video) ;
        history.push('/watch') ;
    };

    getMain = () => {
        if(this.props.selectedVideo){
            return (
                <div className="Main">
                    <iframe title="video palyer" src={`https://www.youtube.com/embed/${this.props.selectedVideo.id.videoId}`} className="Main__player"/>
                    <p className="video__title">{this.props.selectedVideo.snippet.title}</p>
                    <div className="stats">
                        <div className="leftStats">
                            <p>{`${this.props.selectedVideo.viewCount} views`} &bull; {this.props.selectedVideo.date}</p>
                        </div>
                        <div className="rightStats">
                            <div className="stats__container">
                                <ThumbUpAltIcon className="icon" />
                                <span>{this.props.selectedVideo.likeCount}</span>
                            </div>
                            <div className="stats__container">
                                <ThumbDownIcon className="icon" />
                                <span>{this.props.selectedVideo.dislikeCount}</span>
                            </div>
                            <div className="stats__container">
                                <ShareIcon className="icon" />
                                <span>Share</span>
                            </div>
                            <div className="stats__container">
                                <BookmarkIcon className="icon" />
                                <span>Save</span>
                            </div>
                            <div className="stats__container">
                                <MoreHorizIcon className="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="video__description">
                        <img className="channel__img" src={this.props.selectedVideo.channelImg} alt={this.props.selectedVideo.id.videoId}/>
                        <div className="channel__description">
                            <div className="channel__description--subscribe">
                                <p className="channel__title">{this.props.selectedVideo.snippet.channelTitle}</p>
                                <a className="subscribe__btn" href="#!">SUBSCRIBE</a>
                            </div>
                            <div className="channel__description--more">
                                {this.props.selectedVideo.snippet.description}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    getReccomendation = this.props.videos.map(video => {
        if(video.id.kind === 'youtube#video') {
            return (
                <div className="recommendation__video" onClick={()=> this.handleClick(video)}>
                    <div className="video__thumbnail--container">
                        <img className="video__thumbnail" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        <span>{video.videoDuration}</span>
                    </div>
                    <div className="recommendation__video--details">
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.channelTitle}</p>
                        <p>{`${video.viewCount} views`} &bull; {video.publishedTime}</p>
                    </div>
                </div>
            );
        }
        return ;
    });

    render() {
        return (
            <div className="watch__video">
                {this.getMain()}
                <div className="recommendation">
                    {this.getReccomendation}
                </div>
            </div>
        );
    }
}

export default WatchVideo ;