import React, { useState } from 'react';

interface SearchResult {
    groupId: string,
    artifactId: string,
    version: string,
    classifier: string,
    fileExtension: string
}

const SearchPanel = () => {

    const [query, setQuery] = useState<String>("");

    const[searchResults, setSearchResults] = useState<SearchResult[]>();

    const searchApi = () => {
        console.log("Searching for query="+query);
        fetch("http://localhost:8080/searcha?q="+query)
            .then(res => res.json())
            .then(
                (result:SearchResult[]) => { console.log(result); setSearchResults(result); },
                (error) => {console.log("Error Occurred: "+error)}
            );
    }

    return (
        <div className="search-container">
            <div className="search-box">
                <input className="search-input" type="text" placeholder="Search" onChange={e => setQuery(e.target.value)}/>
                <input className="search-btn" type="submit" value="Search" onClick={searchApi} />
            </div>
            <div className="search-result">
                <ul>
                {searchResults?.map( res => {
                    return <li>{res.groupId} {res.artifactId} {res.version}</li>
                })}
                </ul>
            </div>
        </div>
    );
}

export default SearchPanel;