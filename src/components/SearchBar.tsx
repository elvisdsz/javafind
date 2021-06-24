import { createStyles, Divider, fade, IconButton, InputBase, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles((theme) => createStyles({
    search: {
        display: 'flex',
        flex: 1,
        margin: 'auto',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        /*marginRight: theme.spacing(2),
        marginLeft: 0,*/
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            /*marginLeft: theme.spacing(3),*/
            /*width: 'auto',*/
            maxWidth: '50vw'
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        flexGrow: 1,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        /*[theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
            width: '60ch',
            },
        },*/
    },
    submitIconButton: {
        padding: theme.spacing(0, 2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));


const SearchBar:React.FC<RouteComponentProps> = (props) => {

    const classes = useStyles();

    const [queryText, setQueryText] = useState<string>("");
    /*const[searchResults, setSearchResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if(searchResults.length > 0) {
            props.history.push(`/search?q=${encodeURIComponent(queryText).replace(/%20/g, "+")}`,
                        { searchResults: searchResults });
        }
    }, [searchResults])*/

    const enterKeyToSearch:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.code === "Enter") {
            event.preventDefault();
            submitSearchQuery();
        }
    }

    const submitSearchQuery = () => {
        //console.log("Searching:"+queryText);
        //const encodedQuery = encodeURIComponent(queryText);
        props.history.push(`/search?q=${encodeURIComponent(queryText).replace(/%20/g, "+")}`);
        /*
        fetch(`http://localhost:8080/searcha?q=${encodedQuery}`)
            .then(res => res.json())
            .then(
                (result:SearchResult[]) => {
                        //setSearchResults(result); 
                        props.history.push(`/search?q=${encodeURIComponent(queryText).replace(/%20/g, "+")}`,
                            { searchResults: result });
                    },
                (error) => {console.log("Error Occurred: "+error)}
            );*/
    }

    return(
        <div className={classes.search} >
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setQueryText(e.target.value)}
                onKeyUp={enterKeyToSearch}
            />
            {queryText.length>0 &&
            <IconButton type="submit" className={classes.submitIconButton} aria-label="search" onClick={submitSearchQuery}>
                <PlayCircleOutlineIcon />
            </IconButton>}
            {/*searchResults.length > 0 &&
                <Redirect to={{
                    pathname: `/search?q=${encodeURIComponent(queryText).replace(/%20/g, "+")}`,
                    state: { searchResults: searchResults }
                    }}
                    push /> /* https://stackoverflow.com/questions/50516096/react-router-v4-redirect-to-same-route-with-different-query-params *
            */}
        </div>
    );
}

export default withRouter(SearchBar);