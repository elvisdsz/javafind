import { Divider, IconButton, Input, InputAdornment, InputBase, makeStyles, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsIcon from '@material-ui/icons/Directions';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 10px',
        display: 'flex',
        margin: 'auto',
        width: '60%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },



    searchPaper: {
      display:'flex',
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      margin: 'auto',
      marginTop: '20px',
      width: "80%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

interface SearchBoxProps {
    showSearchPanel: boolean,
    searchOnClickHandler: (event:React.MouseEvent)=>void,
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void,
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement>|undefined
}

const SearchBox:React.FC<SearchBoxProps> = (props) => {

    const classes = useStyles();

    return(
        <Paper component="form" className={classes.root} onClick={props.searchOnClickHandler}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase
                className={classes.input}
                placeholder="Search Source Artifacts"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp===undefined?()=>{}:props.onKeyUp}
                autoFocus={true}
            />
        </Paper>
        /*<TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            /*label="TextField"*
            variant="filled"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            ),
            }}
        />*/
        /*
        <div className={"search-box"+(props.showSearchPanel?" hide":"")} onClick={props.searchOnClickHandler}>
            <input className="search-input" type="text" placeholder="Search"/>
            <input className="search-btn" type="submit" value="Search" />
        </div>*/
    )
}

export default SearchBox;