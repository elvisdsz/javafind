import React, { useEffect, useState } from 'react';

interface SearchResult {
    groupId: string,
    artifactId: string,
    version: string,
    classifier: string,
    fileExtension: string,
    relFilepath: string
}

interface SearchPanelProps {
    show: boolean,
    loadFile: (url: string)=>void,
    hideSearchPanel: ()=>void
}

const SearchPanel:React.FC<SearchPanelProps> = ({show, loadFile, hideSearchPanel}) => {

    const [query, setQuery] = useState<String>("");

    const[searchResults, setSearchResults] = useState<SearchResult[]>();

    useEffect(() => {
        if(show === true)
            document.getElementById("search-input-main")?.focus();
    }, [show]);

    const searchApi = () => {
        console.log("Searching for query="+query);
        fetch("http://localhost:8080/searcha?q="+query)
            .then(res => res.json())
            .then(
                (result:SearchResult[]) => { console.log(result); setSearchResults(result); },
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
        <div className= {"search-container"+(show?"":" hide")} onClick={hideSearchPanel}>
            <div className="close-btn pos-top-left">BK</div>
            <div className="close-btn pos-top-right">X</div>
            <div className="search-box" onClick={stopEventPropagation}>
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
            </div>
        </div>
    );
}

export default SearchPanel;