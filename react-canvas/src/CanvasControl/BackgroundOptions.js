import "./CanvasControl.css";
import {ColorChooser} from "./Shared";
import {BsCheckCircle, BsCircle} from 'react-icons/bs';

/**
 * Choose a transparent background.
 * Or not.
 * @param {*} props 
 */
function Transparent(props) {
    const {transparent, setTransparent} = props;

    function handleChange() {
        setTransparent(!transparent);
    }

    return (
        <span className="icon-container" onClick={handleChange}>
            {transparent ? <BsCheckCircle /> : <BsCircle /> }
            <span className="tooltiptext">Transparent Background?</span>
        </span>
    )
}

/**
 * Contains Options related to Background
 * @param {*} props 
 */
function BackgroundOptions(props) {
    const {transparent, setTransparent, backgroundColor, setBackgroundColor} = props;

    return (
        <span>
            <Transparent transparent={transparent} setTransparent={setTransparent} />
            { !transparent &&
                <ColorChooser
                    color={backgroundColor} 
                    setColor={setBackgroundColor}
                    tipText="Background Color" />
            }
        </span>
    )
}

export default BackgroundOptions;