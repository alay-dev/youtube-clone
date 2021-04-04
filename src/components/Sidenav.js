import React from 'react'; 

import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';

import './Sidenav.css' ;

const Sidenav = () => {
    return (
        <div className="sidenav">
            <div className="icon__container">
                <HomeIcon className="icon active  "/>
                <span>Home</span>
            </div>
            <div className="icon__container">
                <WhatshotIcon className="icon" />
                <span>Trending</span>
            </div>
            <div className="icon__container">
                <SubscriptionsIcon className="icon" />
                <span>Subscriptions</span>
            </div>
            <div className="icon__container">
                <VideoLibraryIcon className="icon"/>
                <span>Library</span>
            </div>
            <div className="icon__container">
                <HistoryIcon className="icon"/>
                <span>History</span>
            </div>
        </div>
    );
};

export default Sidenav ;