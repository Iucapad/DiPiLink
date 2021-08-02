import React, {useState} from 'react';
import {colors,getColor,setColor} from '../services/colors';

const ColorPicker = () => {
    const [color,setColorState] = useState(parseInt(getColor()));
    return(
        <div className="uiThemePicker">
            {colors.map((item, i) => (
                <button key={i} className={`pickerItem ${(color===i)&&"pickerSelected"}`} id={item.name} title={item.name} onClick={() => {setColorState(i);setColor(i);}} style={{background:`linear-gradient(153deg,${item.accent10} 0%, ${item.accent30} 20%,${item.accent80} 69%,${item.accent} 100%)`}}></button>
            ))}
        </div>
    );
}

export default ColorPicker;