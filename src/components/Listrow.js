import React from 'react';

const Listrow = ({ name, type, value, action, title, onClick, focus, removeNetwork }) => {
    switch(action){
        case "edit":
            return(
                <tr title={ title } onClick={ () => onClick() } style={ focus ? { background:'var(--accent-soft)', color:'#FFFFFF88' } : undefined }>
                    <td>{ title }</td><td>{ focus ? <button className="actionButton" title="Supprimer" onClick={ () => removeNetwork(title) }>X</button> : null }</td>
                </tr>
            );
        case "resume":
            return(
                <tr title={ title } style={{ gridTemplateColumns: 'auto 60%' }}>
                    <td>{ title }</td><td><input name={ name } defaultValue={ value } type={ type } autoComplete="off" disabled/></td>
                </tr>
            );
        default:
            return(
            <tr title={ title } onClick={ () => onClick() } style={ focus ? { background:'var(--accent-soft)', color:'#FFFFFF88' } : undefined }>
                <td>{ title }</td>
            </tr>
        );
    };       
};
export default Listrow;