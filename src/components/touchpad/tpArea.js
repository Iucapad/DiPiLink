import React, {Component} from 'react';
import TPBtn from './tpBtn';
import './touchpad.css';

export default class TPArea extends Component{
    render(){
        return(
            <div className="tpArea" id={this.props.id}>
                <TPBtn type={null}/>
            </div>
        );
    }
};