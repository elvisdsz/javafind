import { Backdrop, Box, CircularProgress, Link, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SearchResult } from '../../interface/SearchResult';
import { useLocation, Link as RouterLink, Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

interface LocationState { //extends RouteComponentProps<QueryParams> {
    searchResults: SearchResult[],
    search: string, // query string
}

interface SearchPageProps  {
    loadFile: (url: string)=>void,
}

const SearchPage:React.FC<SearchPageProps> = (props) => {

    const classes = useStyles();

    const location = useLocation<LocationState>();
    const history = useHistory();

    const [searchResults, setSearchResults] = useState<SearchResult[]>();
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
                (result:SearchResult[]) => {
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
        return <ul>
            {searchResults?.map( (res, index) => {
                return <li key={index}>
                        <Link component={RouterLink} to="/" onClick={() => props.loadFile("http://localhost:8080/getFile?fp="+res.relFilepath)}>
                            {res.groupId} {res.artifactId} {res.version}
                        </Link>
                    </li>
            })}
        </ul>
    }

    return(
        <Box>
            <Backdrop className={classes.backdrop} open={showLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Paper className={classes.searchPaper}>
                <h1>Search results</h1>
                { resultsList() }
            </Paper>
        </Box>
    );
}

export default SearchPage;