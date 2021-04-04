import React from 'react' ;

import './SearchResult.css' ;
import history from '../../history' ;

class SearchResult extends React.Component {
    handleClick = (video) => {
        this.props.onVideoSelect(video) ;
        history.push('/watch') ;
    };

    channelDiv = this.props.videos.map(video =>{
        if(video.id.kind === 'youtube#channel') {
            return (
                <div className="resultContainer" key={video.id.videoId}>
                    <div className="imgContainer">
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="main__channel--img" />
                    </div>
                    <div className="details">
                        <h3 className="heading--3">{video.snippet.title}</h3>
                        <p className="details__stats">{`${video.viewCount} views`} &bull; <span>{video.publishedTime}</span></p>
                        <p className="video__description--channel">{video.snippet.description}</p>
                    </div>
                </div>
            );
        }
    });

    videoDiv = this.props.videos.map(video => {
        if(video.id.kind === 'youtube#video') {
            return (
                <div className="resultContainer" key= {video.id.videoId} onClick={()=>this.handleClick(video)}>
                    <div className="imgContainer">
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="main__img"/>
                        <div className="duration">{video.videoDuration}</div>
                    </div>
                    <div className="details">
                        <h3 className="heading--3">{video.snippet.title}</h3>
                        <p className="details__stats">{`${video.viewCount} views`} &bull; <span>{video.publishedTime}</span></p>
                        <div className="details__channel">
                            <img title={video.snippet.channelTitle} className="channel__img" src={video.channelImg} alt={video.snippet.channelTitle} />
                            <p title={video.snippet.channelTitle}>{video.snippet.channelTitle}</p>
                        </div>
                        <p className="video__description">{video.snippet.description}</p>
                    </div>
                </div>
            );
        }
        return null ;
    });

    render() {
        return (
            <div className="searchResults">
                {/* {this.channelDiv} */}
                {this.videoDiv}
            </div>
        );
    }
}

export default SearchResult ;