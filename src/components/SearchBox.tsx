import React from 'react';

interface SearchBoxProps {
    showSearchPanel: boolean,
    searchOnClickHandler: (event:React.MouseEvent)=>void
}

const SearchBox:React.FC<SearchBoxProps> = (props) => {
    return(
        <div className={"search-box"+(props.showSearchPanel?" hide":"")} onClick={props.searchOnClickHandler}>
            <input className="search-input" type="text" placeholder="Search"/>
            <input className="search-btn" type="submit" value="Search" />
        </div>
    )
}

export default SearchBox;