import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { codeviewService } from '../../../services/codeviewService';
import { filesService } from "../../../services/filesService";
import CodeArea from './CodeArea';
import Action from './Action';
import FileSave from './FileSave';

import './Codeview.css';

const UiCodeview = ({ visible }) => {
    const [stack, setStack] = useState(codeviewService.stack);

    const handleSync = () => {
        setStack(codeviewService.stack);
    }
    useEffect(() => {
        window.document.addEventListener('codesync', handleSync);
        return () => {
            window.document.removeEventListener('codesync', handleSync);
          };
      }, []);

    return(
        <div id="aboutView" style={ visible }>
            <div className="uiCard">
                <h1><FormattedMessage id={ "codeview.editor" }/></h1>
                <p><FormattedMessage id={ "codeview.text" }/></p>
                <CodeArea/>
            </div>
            <div className="uiCard">
                <div className="code-stack">
                <h3><FormattedMessage id={ "codeview.actions_stack" }/></h3>
                    <div className="stack-content align-center">
                        {stack.length > 0 ?
                        stack.map((item, i) => 
                            <Action key={ item } action={ item }/>
                        )
                        :
                        <p style={{ fontWeight: 100 }}><FormattedMessage id={ "codeview.empty_stack" }/></p>
                        }
                    </div>
                </div>

            </div>
            { filesService.folder && <FileSave/> }
        </div>
    );
};

export default UiCodeview;