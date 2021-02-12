/**
 * File for function components used by multiple other files
 */
import "./CanvasControl.css"

/**
 * Used to choose a color
 * @param {*} props 
 */
export function ColorChooser(props) {
    const {color, setColor, tipText} = props;

    function handleChange(event) {
        setColor(event.target.value);
    }

    return (
        <span className="icon-container">
            <input 
                className="color-chooser"
                type="color" 
                value={color} 
                onChange={handleChange} />
            <span className="tooltiptext">
                {tipText}
            </span>
        </span>
    )
}
