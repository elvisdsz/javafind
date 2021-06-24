import { Backdrop, Box, CircularProgress, List, makeStyles, ListSubheader, Divider, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SearchResultIF } from '../../interface/SearchResultIF';
import { useLocation, Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
import SearchResult from './SearchResult';

const useStyles = makeStyles((theme) => ({
    /*searchPaper: {
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        width: "80%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },*/
    searchResultArea: {
        /*display:'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: theme.spacing(2, 4, 3),*/
        /*alignItems:'center',*/
        /*[theme.breakpoints.up('sm')]: {
            width:'50%',
          }*/
    },
    resultList: {
        backgroundColor: theme.palette.background.paper,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

interface LocationState { //extends RouteComponentProps<QueryParams> {
    searchResults: SearchResultIF[],
    search: string, // query string
}

interface SearchPageProps  {
    loadFile: (url: string)=>void,
}

const SearchPage:React.FC<SearchPageProps> = (props) => {

    const classes = useStyles();

    const location = useLocation<LocationState>();
    const history = useHistory();

    const [searchResults, setSearchResults] = useState<SearchResultIF[]>();
    const [showLoading, setShowLoading] = useState(false);

    console.log("Received loc state:", location.state);
    console.log("Received loc search:", location.search);

    useEffect(() => {

        let pathQuery = new URLSearchParams(location.search).get("q");
        // console.log("Received pathQuery:", pathQuery);

        if(location.state==null){
            setShowLoading(true);
            if(pathQuery == null || pathQuery.length < 1) {
                history.push('/');
            }
            // TODO: Duplicated code. Centralize
            fetch(`http://localhost:8080/searcha?q=${encodeURIComponent(pathQuery!)}`)
            .then(res => res.json())
            .then(
                (result:SearchResultIF[]) => {
                        setSearchResults(result); 
                    },
                (error) => {console.log("Error Occurred: "+error)}
            )
            .finally(()=>{
                setShowLoading(false);
            });
        } else {
            setSearchResults(location.state.searchResults);
        }
        
    }, [history, location.search, location.state]);

    
    const resultsList = () => {
        return <List className={classes.resultList}>
            <ListSubheader>Showing 10 of 512 results found</ListSubheader>
            {searchResults?.map( (res, index) => {
                return (<>
                        <Divider component="li" />
                        <SearchResult index={index} result={res} loadFile={props.loadFile} />
                    </>)
            })}
        </List>
    }

    return(
        <Box overflow="auto">
            <Backdrop className={classes.backdrop} open={showLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box m={2} /*className={classes.searchPaper}*/ display="flex">
                <Box flex="1" mr={2} /*boxShadow={2}*/ display={{ xs: 'none', md: 'block' }}>
                    
                </Box>
                <Box flex="3" boxShadow={2} >
                    { resultsList() }
                </Box>
                <Box flex="1" ml={2} /*boxShadow={2}*/ display={{ xs: 'none', md: 'block' }}>
                    
                </Box>
            </Box>
        </Box>
    );
}

export default SearchPage;