import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { codeviewService } from '../../../services/codeviewService';

const commands = { 
    "go": e => <span style={{color: "orange"}}> {e} </span>,
    "pivot": e => <span style={{color: "orange"}}> {e} </span>,
    "wait": e => <span style={{color: "orange"}}> {e} </span>
};

const options = { 
    "left": e => <span style={{color: "plum"}}> {e} </span>,
    "right": e => <span style={{color: "plum"}}> {e} </span>
};

const isLength = e => /^[0-9]\d*((\.\d)?)+s$/.test(e) && <span style={{color: "cyan"}}> {e} </span>;

const CodeArea = () => {
    const [content, setContent] = useState(codeviewService.editor);
    const textArea = useRef(null);
    let valueTimeoutId;
    let serviceTimeoutId;

    const setInnerContent = value => {
        valueTimeoutId && clearTimeout(valueTimeoutId);
        serviceTimeoutId && clearTimeout(serviceTimeoutId);
        valueTimeoutId = setTimeout(() => {
            setContent(value);
        }, 15);
        serviceTimeoutId = setTimeout(() => {
            codeviewService.setEditor(value);
        }, 1000);
    }

    const formatElement = (e, ind) => {
        return commands[e] ? commands[e](e) : options[e] ? options[e](e) : isLength(e) ? isLength(e) : e[0] ? <span> { e } </span> : <br key={ ind }/> ;
    }

    const formatLine = (e, ind) => <CodeLine key={ ind } content={ e.split(/\s/).map(e => formatElement(e, ind)) }/>

    const getInnerContent = () => {
        const values = content.split(/\n/);
        if (textArea.current) {
            textArea.current.cols = textArea.current.value.length;
            textArea.current.rows = values.length;
        }
        return values.map((line, ind) => formatLine(line, ind));
    }
    
    return (
        <div className="code-area">
            <textarea ref={ textArea } onChange={ e => setInnerContent(e.target.value) } placeholder={ useIntl().formatMessage({id:"codeview.placeholder"}) } spellCheck="false"></textarea>
            <div id="code-visible">{ getInnerContent() }</div>
        </div>
    );
}

export default CodeArea;

const CodeLine = ({ content }) => {
    return (
        <div className="codeview-line"> 
            { content } 
            <img className="newline themed-img" height="20" src={ require(`./codeview_newline.svg`).default } alt=""/>
        </div>
    );
}