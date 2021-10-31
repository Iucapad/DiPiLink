import React, {Component,lazy,Suspense} from 'react';
import Loading from './Loading';
import NotConnectedPage from'./steps/NotConnectedPage';
import P2PConnectedPage from'./steps/P2PConnectedPage';
import LocalConfigPage from './steps/LocalConfigPage';
import AuthenticatePage from './steps/AuthenticatePage';
import { api } from '../services/clientService';

const UsersPage = lazy(()=>import('./steps/UsersPage'));
const SettingsPage = lazy(()=>import('./steps/SettingsPage'));

export default class Slideview extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentView: undefined
        };
    }
    checkState = () => {
        const target = api.get();
        if (target) {
            if (String(api.get()).includes("dipi.car")){
                this.setState({ currentView: 1 }); 
            }else{
                this.setState({ currentView: 3 });
            }
        }
        else
        {
            this.setState({currentView:0});
            setTimeout(() => this.checkState(), 5000);
        }
    }       
    componentDidMount(){
        setTimeout(() => this.checkState(), 2000);
    }
    handleState = (value)=>{
        if (value==="next"){
            this.setState({currentView: this.state.currentView+1});
        } else if (value==="previous") {
            this.setState({currentView: this.state.currentView-1});
        } else if (value==="p2pMode") {
            this.setState({currentView: 3});
        } else if (value==="load") {
            this.setState({currentView: 4});
        }
    }
    getContent(){
        return [
            <NotConnectedPage key="0" confState={ this.handleState }/>,
            <P2PConnectedPage key="1" confState={ this.handleState }/>,
            <LocalConfigPage key="2" checkState={ this.checkState }/>,
            <UsersPage key="3" appState={ this.props.appState } confState={ this.handleState }/>,
            <SettingsPage key="4" state={ this.props.state }/>,
            <AuthenticatePage key="5"/>
        ][this.state.currentView]
    }
    render(){
        return(
            <>
            {this.state.currentView ?
                <div key={this.state.currentView} className="height-anim">
                <Suspense fallback={<Loading/>}>
                    {this.getContent()}
                </Suspense>
                </div>
                : <Loading/>}
            </>
        );
    }
}