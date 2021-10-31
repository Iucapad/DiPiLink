import { useState } from 'react';
import { useIntl } from 'react-intl';
import { codeviewService } from '../../../services/codeviewService';

const commands = ["go", "turn", "wait"];
const isLength = e => e === "3s";


const CodeArea = () => {{
    const [content, setContent] = useState(codeviewService.editor);
    let valueTimeoutId;

    const setInnerContent = (value) => {
        if (valueTimeoutId) {
            clearTimeout(valueTimeoutId);
        }
        valueTimeoutId = setTimeout(() => {
            codeviewService.setEditor(value);
            setContent(value);
        }, 10);
    }

const formatElement = e => {
    e.replace("/\n/g", "<br/>")
    if (commands.includes(e)) return <span style={{color: "orange"}}> {e} </span>;
    if (isLength(e)) return <span style={{color: "cyan"}}> {e} </span>;
    return <span> {e} </span>;
}

    const getInnerContent = () => {
        return content.split(" ").map(e => formatElement(e))
    }
    
    return (
        <div className="code-area">
            <textarea onChange={ e => setInnerContent(e.target.value) } placeholder={ useIntl().formatMessage({id:"codeview.placeholder"}) } spellcheck="false"></textarea>
            <div id="code-visible">{ getInnerContent() }</div>
        </div>
    );
}}

export default CodeArea;