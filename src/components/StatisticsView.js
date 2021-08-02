import React, {Component} from 'react';
import {statsService} from '../services/statsService';

import { withGlobalState } from 'react-globally';
import {injectIntl} from 'react-intl';
import './statistics.css';

class StatisticsView extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.setState({
            id:this.props.globalState.currentUser.id,
            name:this.props.globalState.currentUser.name
        });
    }
    render(){
        return(
            <div id="statsView" style={this.props.visible}>
                <div className="uiCard">
                    <div id="id-container">
                        <div id="identity">
                            <div className="usertag">
                                <span>{this.props.globalState.currentUser.name.slice(0,1)}</span>
                            </div>
                            <div id="top-content">
                                <h1>{this.state.name}</h1>
                            </div>
                        </div>
                        <div id="details-content">
                            <h2>Détails</h2>
                            <p>ID: {this.state.id}</p>
                            <p>Première connexion: {statsService.getStat("firstco")}</p>
                            <p>Temps de conduite: {statsService.getStat("playtime")}</p>
                        </div>
                        <div id="country-flag" className="usertag">
                            <span>BE</span>
                        </div>
                    </div>
                <p>Mode d'interaction préféré : Manette de jeu</p>
                </div>
            </div>
        );
    }
}
export default injectIntl(withGlobalState(StatisticsView));