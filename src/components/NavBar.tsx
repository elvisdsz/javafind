import { AppBar, Button, createStyles, fade, Hidden, IconButton, InputBase, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
}));

interface NavBarProps {
    searchPanel: boolean,
    showSearchPanel: ()=>void
}

const NavBar:React.FC<NavBarProps> = ({searchPanel, showSearchPanel}) => {

  const classes = useStyles();

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
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          JavaFind
        </Typography>
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;