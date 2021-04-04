import React from 'react' ;
import { Link } from 'react-router-dom' ;

import logo from '../../img/logo.png' ;
import './header.css' ;
import SearchBar from './SearchBar' ;
import MenuIcon from '@material-ui/icons/Menu';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Header extends React.Component  {
    render() {
        return(
            <div className="header">
                <div className="leftIcon">
                    <MenuIcon className="icon__menu"/>
                    <Link to="/">
                        <img src={logo } className="header__logo" alt="logo"/>
                    </Link>
                </div>
                <div className="search">
                    <SearchBar onFormSubmit={this.props.onFormSubmit}/>
                    <MicIcon className="icon"/>
                </div>
                <div className="rightIcon">
                    <AppsIcon className="moreIcon"/>
                    <MoreVertIcon className="menuIcon"/>
                    <button>
                        <AccountCircleIcon className="user__icon"/>
                        SIGN IN
                    </button>
                </div>
            </div>
        );
    }
    
};

export default Header ;