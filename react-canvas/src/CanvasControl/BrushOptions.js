import "./CanvasControl.css";
import "./BrushOptions.css"

import {ColorChooser} from "./Shared";
import {brushes} from "../Constants";

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
 * Brush types
 * @param {*} props 
 */
function Brush(props) {
    const {active, brush, setBrush} = props;

    return (
        <span className="brush-container" onClick={setBrush}>
            {brush[1]}
            {!active &&
                <span className="tooltiptext">
                    {brush[0]}
                </span>
            }
        </span>
    )
}

/**
 * Used to select drawing tool
 * @param {*} props 
 */
function BrushChooser(props) {
    const {brushType, setBrushType} = props;

    const elems = brushes.map((value, index) => {
        return <Brush brush={value} key={index} setBrush={() => setBrushType(value)} />;
    });

    return (
        <span className="brush-chooser">
            <Brush brush={brushType} setBrush={() => {}} active/>
            <span className="brushes">
                {elems}
            </span>
        </span>
    )
}

/**
 * Options related to the brush
 * @param {*} props 
 */
function BrushOptions(props) {
    const {brushSize, 
            setBrushSize, 
            color, 
            setColor, 
            brushType, 
            setBrushType} = props;

    return (
        <span>
            <BrushChooser brushType={brushType} setBrushType={setBrushType} />
            <BrushSizer brushSize={brushSize} setBrushSize={setBrushSize} />
            <ColorChooser 
                color={color} 
                setColor={setColor}
                tipText="Brush Color" />
        </span>
    )
}

export default BrushOptions;
