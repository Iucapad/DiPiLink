import './Web.css';

const Web = () =>
    <div className="webLogo align-center">
        <img draggable="false" width="90" height="90" alt="Codeview" src={  require("./codeview.svg").default }/>
        <span>Hello world</span>
    </div>
export default Web;