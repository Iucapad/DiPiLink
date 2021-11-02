const icons = {
    "pivot": require("./assets/cv_pivot.svg").default,
    "go": require("./assets/cv_go.svg").default,
    "wait": require("./assets/cv_wait.svg").default,
}

const filters = {
    "left": {transform: "scaleX(-1)"},
    "backward": {transform: "scaleY(-1)"}
}

const isDegree = e => /^[0-9]\d*((\.\d)?)+deg$/.test(e) && {transform: `rotate(${e})`}

const Action = ({ action }) => {
    return (
        <div className="codeview-action align-center">
            <img draggable="false" width="45" height="45" src={ icons[action.command] } style={ filters[action.option] || isDegree(action.option) || null } alt=""/>
            { action.length && <div className="badge align-center">{ action.length }</div> }
        </div>
    );
}

export default Action;