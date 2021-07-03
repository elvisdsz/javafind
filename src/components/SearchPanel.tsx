import { InputAdornment, makeStyles, Modal, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from './SearchBox';
import { SearchResultIF } from '../interface/SearchResultIF';

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
  }));

interface SearchPanelProps {
    show: boolean,
    loadFile: (url: string)=>void,
    hideSearchPanel: ()=>void
}

const SearchPanel:React.FC<SearchPanelProps> = ({show, loadFile, hideSearchPanel}) => {

    const classes = useStyles();

    const [query, setQuery] = useState<String>("");

    const[searchResults, setSearchResults] = useState<SearchResultIF[]>();

    useEffect(() => {
        if(show === true)
            document.getElementById("search-input-main")?.focus();
    }, [show]);

    const searchApi = () => {
        console.log("Searching for query="+query);
        fetch("http://localhost:8080/searcha?q="+query)
            .then(res => res.json())
            .then(
                (result:SearchResultIF[]) => { console.log(result); setSearchResults(result); },
                (error) => {console.log("Error Occurred: "+error)}
            );
    }

    const enterKeyToSearch:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.code === "Enter") {
            event.preventDefault();
            searchApi();
        }
    }

    const stopEventPropagation = (event:React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
        /*<Hidden xsUp={!show} /*className= {"search-container"+(show?"":" hide")} onClick={hideSearchPanel} >*/
        <Modal open={show} onClose={hideSearchPanel}
            aria-labelledby="search-dialog" aria-describedby="search for maven artifacts">
            <>
                <SearchBox showSearchPanel={true} searchOnClickHandler={() => {}} 
                        onChange={e => setQuery(e.target.value)} onKeyUp={enterKeyToSearch} />
                <Paper className={classes.searchPaper}>
                    <div className="search-result" onClick={stopEventPropagation}>
                        <ul>
                        {searchResults?.map( res => {
                            return <li onClick={() => loadFile("http://localhost:8080/getFile?fp="/*+res.relFilepath*/)}>{res.groupId} {res.artifactId} {/*res.version*/}</li>
                        })}
                        </ul>
                    </div>
                </Paper>
            </>
        </Modal>
        /*</Hidden>*/
        /*<div className="search-box" onClick={stopEventPropagation}>
            <input id="search-input-main" className="search-input" type="text" placeholder="Search"
                    onChange={e => setQuery(e.target.value)} onKeyUp={enterKeyToSearch}/>
            <input className="search-btn" type="submit" value="Search" onClick={searchApi} />
        </div>
        <div className="search-result" onClick={stopEventPropagation}>
            <ul>
            {searchResults?.map( res => {
                return <li onClick={() => loadFile("http://localhost:8080/getFile?fp="+res.relFilepath)}>{res.groupId} {res.artifactId} {res.version}</li>
            })}
            </ul>
        </div>*/
    );
}

export default SearchPanel;