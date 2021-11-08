import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { codeviewService } from '../../../services/codeviewService';

const commands = { 
    "go": e => <span style={{color: "orange"}}>{ e }</span>,
    "pivot": e => <span style={{color: "orange"}}>{ e }</span>,
    "wait": e => <span style={{color: "orange"}}>{ e }</span>
};

const options = {
    "left": e => <span style={{color: "plum"}}>{ e }</span>,
    "right": e => <span style={{color: "plum"}}>{ e }</span>,
    "forward": e => <span style={{color: "plum"}}>{ e }</span>,
    "backward": e => <span style={{color: "plum"}}>{ e }</span>,
};

const keywords = {
    "const": e => <span style={{color: "#6495ed"}}>{ e }</span>,
    "var": e => <span style={{color: "#6495ed"}}>{ e }</span>,
}

const operators = {
    "=": e => <span style={{color: "chocolate"}}>{ e }</span>,
    "+": e => <span style={{color: "chocolate"}}>{ e }</span>,
    "-": e => <span style={{color: "chocolate"}}>{ e }</span>,
    "*": e => <span style={{color: "chocolate"}}>{ e }</span>,
}

const supported = {
    ...commands,
    ...options,
    ...keywords,
    ...operators
}

const isDegree = e => /^[0-9]\d*((\.\d)?)+deg$/.test(e) && <span style={{color: "plum"}}>{ e }</span>;

const isLength = e => /^[0-9]\d*((\.\d)?)+s$/.test(e) && <span style={{color: "cyan"}}>{ e }</span>;

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
        }, 1500);
    }

    const formatElement = (e) => {
        return supported[e] ? supported[e](e) : isLength(e) ? isLength(e) : isDegree(e) ? isDegree(e) : e === " " ? <span>&nbsp;</span> : <span>{ e }</span>;//TODO FIX HERE
    }

    const formatLine = (e, ind) => {
        return <CodeLine key={ ind } content={ e.split(/(\s)/).map(e => e ? formatElement(e, ind) : e) }/>
        }

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