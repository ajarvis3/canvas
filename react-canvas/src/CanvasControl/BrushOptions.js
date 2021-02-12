import "./CanvasControl.css";
import {ColorChooser} from "./Shared";
// import { BsBrush } from 'react-icons/bs';
// import { BiShapePolygon, BiShapeCircle, BiShapeSquare } from 'react-icons/bi';

/**
 * Used to select brush size
 * @param {*} props 
 */
function BrushSizer(props) {
    const {brushSize, setBrushSize} = props;

    function handleChange(event) {
        setBrushSize(event.target.value);
    }

    return (
        <span>
            <label>Brush Size:</label>
            <input type="number" value={brushSize} onChange={handleChange}/>
        </span> 
    )
}

/**
 * Options related to the brush
 * @param {*} props 
 */
function BrushOptions(props) {
    const {brushSize, setBrushSize, color, setColor} = props;

    return (
        <span>
            <BrushSizer brushSize={brushSize} setBrushSize={setBrushSize} />
            <ColorChooser 
                color={color} 
                setColor={setColor}
                tipText="Brush Color" />
        </span>
    )
}

export default BrushOptions;
