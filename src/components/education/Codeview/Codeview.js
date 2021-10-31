import { FormattedMessage } from 'react-intl';
import { codeviewService } from '../../../services/codeviewService';
import CodeArea from './CodeArea';
import Action from './Action';

import './Codeview.css';

const UiCodeview = ({ visible }) => {
    return(
        <div id="aboutView" style={ visible }>
            <div className="uiCard">
                <h1><FormattedMessage id={ "codeview.editor" }/></h1>
                <p><FormattedMessage id={ "codeview.text" }/></p>
                <CodeArea/>
            </div>
            <div className="uiCard">
                <h3>Call stack</h3>
                {codeviewService.stack.length > 0 ?
                codeviewService.stack.map((item, i) => 
                    <Action key={ i } action={ item }/>
                )
                :
                <p style={{ fontWeight: 100 }}>Start coding first</p>
                 }

            </div>
        </div>
    );
};

export default UiCodeview;