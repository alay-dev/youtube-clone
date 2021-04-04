import React from 'react' ;

// import Video from './Video' ;
import './Body.css' ;
import history from '../../history' ;

const Body = ({videos, onVideoSelect}) => {

    const handleClick = (video) => {
        onVideoSelect(video) ;
        history.push('/watch') ;
    };

    const videoComponents = videos.map((video) => {

        if(video.id.kind === 'youtube#video') {
            return (
                <div className="video__container" key={video.id.videoId} onClick={()=> handleClick(video)}>
                    <div className="main__imgContainer">
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="main__img"/>
                        <div className="duration">{video.videoDuration}</div>
                    </div>
                    <div className="details">
                        <div>
                            <img title={video.snippet.channelTitle} className="channel__Img" src={video.channelImg} alt={video.snippet.channelTitle} />
                        </div>
                        <div>
                            <div title={video.snippet.title} className="video__Title" alt={video.snippet.title}>{video.snippet.title} </div>
                            <p title={video.snippet.channelTitle}>{video.snippet.channelTitle}</p>
                            <p>{`${video.viewCount} views`} &bull; <span>{video.publishedTime}</span></p>
                        </div>
                    </div>
                </div>
            ) ;
        }
        else {
            return null ;
        }
    });

    return(
        <div className="main__body">
            {videoComponents}
        </div>
    );
};

export default Body ; 