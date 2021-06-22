import { AppBar, Button, createStyles, fade, Hidden, IconButton, InputBase, makeStyles, Switch, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import { PinDropSharp } from '@material-ui/icons';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    /*flexGrow: 1,*/
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
}));

interface NavBarProps {
    searchPanel: boolean,
    showSearchPanel: ()=>void,
    theme: boolean,
    toggleTheme: ()=>void
}

const NavBar:React.FC<NavBarProps> = (props) => {

  const classes = useStyles();

  const searchOnClickHandler = (event:React.MouseEvent) => {
      event.preventDefault();
      props.showSearchPanel();
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
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          JavaFind
        </Typography>
        <SearchBar />
        <Switch checked={props.theme} onChange={props.toggleTheme} />
        <Brightness4Icon/>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;