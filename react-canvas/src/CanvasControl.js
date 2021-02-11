import {useCallback, useRef} from 'react';
import {drawLayer} from "./Utils/DrawingUtils"

import "./CanvasControl.css";

/**
 * Control for adding a layer
 * @param {*} props 
 */
function AddLayer(props) {
    const {paths, setPaths, setActive} = props;

    const handleChange = useCallback(() => {
        const newPaths = paths.slice();
        newPaths.push([]);
        setActive(newPaths.length - 1);
        setPaths(newPaths);
    }, [paths, setPaths, setActive]);

    return (
        <button onClick={handleChange}>
            Add Layer
        </button>
    )
}

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
 * Flattens and downloads image
 * @param {*} props 
 */
function Download(props) {
    const {paths, width, height, backgroundColor} = props;
    const aTag = useRef();
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    paths.forEach((layer) => {
        drawLayer(ctx, layer, width, height);
    })

    function onClick() {
        const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        aTag.current.setAttribute("href", img);
    }

    return (
        <a ref={aTag} href="/#" download="canvas.png">
            <button onClick={onClick}>
                Download Canvas
            </button>
        </a>
    )
}

/**
 * Used to choose brush color
 * @param {*} props 
 */
function ColorChooser(props) {
    const {color, setColor} = props;

    function handleChange(event) {
        setColor(event.target.value);
    }

    return (
        <input 
            className="color-chooser"
            type="color" 
            value={color} 
            onChange={handleChange} />
    )
}

function CanvasControl(props) {
    const {paths, 
            setPaths, 
            setActive, 
            brushSize, 
            setBrushSize, 
            color, 
            setColor, 
            backgroundColor,
            setBackgroundColor,
            width, 
            height} = props;
    return (
        <div className="canvas-control">
            Background Color:
            <ColorChooser color={backgroundColor} setColor={setBackgroundColor}/>
            <AddLayer 
                paths={paths} 
                setPaths={setPaths}
                setActive={setActive} />
            <BrushSizer brushSize={brushSize} setBrushSize={setBrushSize} />
            <ColorChooser color={color} setColor={setColor} />
            <Download paths={paths} width={width} height={height} backgroundColor={backgroundColor}/>
        </div>
    );
}

export default CanvasControl;