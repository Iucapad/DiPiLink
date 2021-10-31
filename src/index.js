import ReactDOM from 'react-dom';
import './App.css';
import App from './App';

import { Provider } from 'react-globally';
import {IntlProvider} from "react-intl";
import {displayLanguage} from './services/clientService';
import locale_en from "./localization/en.json";
import locale_nl from "./localization/nl.json";
import locale_fr from "./localization/fr.json";

const data = {
  "en":locale_en,
  "nl":locale_nl,
  "fr":locale_fr
}
const initialState = {
  error: null,
  currentUser:{id:0,name:"undefined"},
  exp:false,
  hostname:undefined
}

let language = displayLanguage.get();
if (!data[language]) {displayLanguage.set("en"); language="en";}

ReactDOM.render(
    <Provider globalState={initialState}>
      <IntlProvider locale={language} messages={data[language]}>
        <App/>
      </IntlProvider>
    </Provider>,
  document.getElementById('root')
);


