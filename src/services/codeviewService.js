
class CodeviewService {
    constructor() {
        this.codeStack = [{
            name: "go",
            option: "towards",
            length: "3s"
        }];
        this.editorContent = "";
    }

    setEditor = (content) => this.editorContent = content;

    get editor() { return this.editorContent };

    get stack() { return this.codeStack };
}

export const codeviewService = new CodeviewService();