import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBox from './SearchBox';

interface NavBarProps {
    searchPanel: boolean,
    showSearchPanel: ()=>void
}

const NavBar:React.FC<NavBarProps> = ({searchPanel, showSearchPanel}) => {

    const searchOnClickHandler = (event:React.MouseEvent) => {
        event.preventDefault();
        showSearchPanel();
    }

    return (
        /*<div className="topnavbar">
            <p className="brand">JavaFind</p>
            <div className={"search-box"+(searchPanel?" hide":"")} onClick={searchOnClickHandler}>
                <input className="search-input" type="text" placeholder="Search"/>
                <input className="search-btn" type="submit" value="Search" />
            </div>
        </div>*/
        <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" /*className={classes.menuButton}*/ color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            JavaFind
          </Typography>
          <SearchBox showSearchPanel={searchPanel} searchOnClickHandler={searchOnClickHandler} />
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;