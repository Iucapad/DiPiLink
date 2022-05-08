import React, { useRef, useState, useEffect, useCallback } from 'react';
import Tab from './Tab';
import './Navigation.css';
import { withGlobalState } from 'react-globally';
import { injectIntl } from 'react-intl';

const app = window.document.getElementById("root");

const UiHeader = ( { appState, intl, globalState, state } ) => {
    const [open, setOpen] = useState( false );
    const [tabs, setTabs] = useState( ["confTab", "aboutTab"] );
    const [style, setStyle] = useState( '' );
    const [edge, setEdge] = useState( window.matchMedia("(max-width: 600px)").matches ? 'edge' : '' );
    const contEl = useRef(null);
    const tab = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
          };
      }, []);

    const handleResize = tab => {
        if (!tab) return;
        setEdge( window.matchMedia("(max-width: 600px)").matches ? 'edge' : '' );
        if (!window.matchMedia("(max-width: 600px)").matches) {
            setOpen( false );
            app.classList.remove('ufc');
            setStyle( '' );
        };
    };

    const handleClick = () => {
        if (open) {
            app.classList.remove('ufc');
            setTimeout(() => setStyle( '50px' ), 200);
        } else {
            app.classList.add('ufc');
            setStyle( '100vh' );
        }
        setOpen( !open );
    };

    const previous = () => {
        const current = tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        current > 0 && appState({currentTab: tabs[current-1]});
    }
    const next = () => {
        const current = tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        current < tabs.length-1 && appState({currentTab: tabs[current+1]});
    }
    const handleGP = e => {
        if (e.detail === 4) {
            previous();
        } else if (e.detail === 5) {
            next();
        }
    }
    if (1 > 9) (handleGP("debug") && setTabs("debug")); // TODO remove this
    
    const getMode = ( current ) => {
        const modes = {
            default:
                <>
                    <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={ handleClick }/>
                    <Tab state={ state.currentTab } id="confTab" text={ intl.formatMessage({id:"tab.iniSetTab"}) } handleClick={ handleClick } appState={ appState }/>
                    <Tab state={ state.currentTab } id="aboutTab" text={ intl.formatMessage({id:"tab.aboutTab"}) } handleClick={ handleClick } appState={ appState }/>
                </>,
            bridge:
                <>
                    <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={ handleClick }/>
                    <Tab state={ state.currentTab } id="carTab" text={ (globalState.hostname && globalState.hostname.length <= 15 && globalState.hostname !== "raspberrypi") ? globalState.hostname : intl.formatMessage({id:"tab.carTab"}) } handleClick={ handleClick } appState={ appState }/>
                    <Tab state={ state.currentTab } id="statsTab" text={ intl.formatMessage({id:"tab.statsTab"}) } handleClick={ handleClick } appState={ appState }/>
                    <Tab state={ state.currentTab } id="confTab" text={ intl.formatMessage({id:"tab.setTab"}) } handleClick={ handleClick } appState={ appState }/>
                    <Tab state={ state.currentTab } id="aboutTab" text={ intl.formatMessage({id:"tab.aboutTab"}) } handleClick={ handleClick } appState={ appState }/>
                </>,
            codeview:
                <>
                    <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={ handleClick }/>
                    <Tab state={ state.currentTab } id="codeviewTab" text={ intl.formatMessage({id:"tab.codeviewTab"}) } handleClick={ handleClick } appState={ appState }/>
                    <Tab state={ state.currentTab } id="aboutTab" text={ intl.formatMessage({id:"tab.aboutTab"}) } handleClick={ handleClick } appState={ appState }/>
                </>
        }
        return modes[current];
    };
;
    return (
        <header ref={contEl}>
            <div id="safearea"/>
            <ul className={ `tab ${ open ? "open" : "" } ${edge}` } id="maintab" style={{ height: style }} ref={ tab }> 
            { getMode(state.currentMode) }
            </ul>
            <p id="hdrTitle">{ intl.formatMessage( {id:`tab.${ state.currentTab }`} ) }</p>
            {open && <OpenManager contEl={ contEl } setOpen={ handleClick }/>}
        </header>
    );
}
/*
    componentDidUpdate(prevProps){
        window.document.addEventListener("gpInput", handleGP, false);
        if (this.props !== prevProps){
            state.currentMode === "bridge" && setTabs( ["carTab","statsTab","confTab","aboutTab"] );
        }
    }*/

const OpenManager = ({ contEl, setOpen }) => {
    const handleClick = useCallback(e => {
        const el = contEl.current;
        if (el && el.contains(e.target)) return;
        setOpen();      
      },[setOpen, contEl]);
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [setOpen, handleClick]);

    return <></>
}

export default injectIntl(withGlobalState(UiHeader));