const commands = [
    "go",
    "pivot",
    "wait"
];

const options = [
    "left",
    "right",
    "forward",
    "backward"
];

const isDegree = e => /^[0-9]\d*((\.\d)?)+deg$/.test(e)

const isLength = e => /^[0-9]\d*((\.\d)?)+s$/.test(e);

const builder = element => {
    let resObj = {};
    element.split(/\s/).map(e => {
        if (commands.includes(e)) return resObj.command = e;
        if (options.includes(e) || isDegree(e)) return resObj.option = e;
        if (isLength(e)) return resObj.length = e;
        return resObj;
    });
    return resObj;
}

class CodeviewService {
    constructor() {
        this.codeStack = [];
        this.editorContent = "";
    }

    buildStack = () => {
        this.codeStack = this.editorContent.split(/\n/).map(e => builder(e)).filter(e => e.command && e.length);
        document.dispatchEvent( new CustomEvent('codesync') );
    }

    setEditor = content => { 
        this.editorContent = content;
        this.buildStack();
    };

    get editor() { return this.editorContent };

    get stack() { return this.codeStack };
}

export const codeviewService = new CodeviewService();