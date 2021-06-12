import React from 'react';

interface NavBarProps {
    searchPanel: boolean,
    showSearchPanel: ()=>void
}

const NavBar:React.FC<NavBarProps> = ({searchPanel, showSearchPanel}) => {

    const searchOnClickHandler = (event:React.MouseEvent) => {
        event.preventDefault();
        showSearchPanel();
    }

    return (
        <div className="topnavbar">
            <p className="brand">JavaFind</p>
            <div className={"search-box"+(searchPanel?" hide":"")} onClick={searchOnClickHandler}>
                <input className="search-input" type="text" placeholder="Search"/>
                <input className="search-btn" type="submit" value="Search" />
            </div>
        </div>
    );
}

export default NavBar;