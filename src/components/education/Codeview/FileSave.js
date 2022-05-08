import React, { useState, useCallback, useEffect } from 'react';
import saveIcon from "./assets/cv_save.svg";
//import { filesService } from "../../../services/filesService";

const FileSave = () => {
    const [active, setActive] = useState(false);

    const handleKey = useCallback(e => {
        if (e.key === "Control") {
            return setActive(e.type === "keydown");
        } else if (e.key === "s" && active) {
            console.log("save")
            return e.preventDefault();
        }
        setActive(false);
    },[active, setActive]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        window.addEventListener('keyup', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('keyup', handleKey);
          };
      }, [active, handleKey]);

    return (
        <div className={`filesave align-center action-btn ${active ? "active" : ""}`}>
            <img alt="Save" height="40" src={ saveIcon }/>
            {
                active && <span className="nowrap">+ s</span>
            }
            { true && <div className="badge align-center">{ <div/> }</div> }
        </div>
    );
}

export default FileSave;