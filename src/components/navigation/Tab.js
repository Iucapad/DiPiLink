import React from 'react';

const Tab = ({id, state, text, appState, handleClick}) => {
    const clickEvent = (trg) => {
        appState({currentTab:trg});
        if (window.outerWidth<600){
            handleClick();
        }
      }
    return(
        <li className={`item ${((state===id)?'active':'')}`} id={id} onClick={() => clickEvent(id)}>
            <div className="ind"/>
            <span>{text}</span>
        </li>
    );
}

export default Tab;