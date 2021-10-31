import HowToPage from './steps/HowToPage';
import { VERSION } from '../services/clientService';

const UiAboutview = ({ visible }) => {
    return(
        <div id="aboutView" style={ visible }>
            <div className="uiCard">
                <h1>A propos du projet</h1>
                <p>Le montage du véhicule ainsi que la création de l'application ont été réalisés par Nicolas Jeuniaux et Luca Vitali en temps que travail de fin d'études à la Haute école en Hainaut.</p>
                <img className="about-img" src={ require(`../assets/dipilink.png`).default } alt="<img>"/>
                <p>Icônes et illustrations : Rémy Jeuniaux</p>
            </div>
            <HowToPage/>
            <ImageView/>
        </div>
    );
};

export default UiAboutview;

const ImageView = () => {
    return(
        <div id="imgView" className="uiCard">
            <h4>
                Mentions légales
            </h4>
            <p>
                DiPi Link {VERSION}
            </p>
            <p>
                DiPi - © 2021 Saison
            </p>
        </div>
    );
};