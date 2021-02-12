import {useCallback, useRef} from 'react';
import {drawLayer} from "./Utils/DrawingUtils"
import {BsCheckCircle, BsCircle, BsLayersFill, BsDownload} from 'react-icons/bs';

import "./CanvasControl.css";

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
        <span className="icon-container" onClick={handleChange}>
            <BsLayersFill />
            <span className="tooltiptext">Add a Layer</span>
        </span>
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
    const {paths, width, height, backgroundColor, transparent} = props;
    const aTag = useRef();
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!transparent) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);    
    }
    paths.forEach((layer) => {
        drawLayer(ctx, layer, width, height);
    })

    function onClick() {
        const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        aTag.current.setAttribute("href", img);
    }

    return (
        <a ref={aTag} href="/#" download="canvas.png" className="icon-container">
            <BsDownload onClick={onClick}/>
            <span className="tooltiptext">Download</span>
        </a>
    )
}

/**
 * Used to choose brush color
 * @param {*} props 
 */
function ColorChooser(props) {
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

/**
 * Options for downloading
 * @param {*} props 
 */
function DownloadOptions(props) {
    const {paths, width, height, backgroundColor, transparent} = props;

    return (
        <span>
            <Download 
                paths={paths} 
                width={width} 
                height={height} 
                backgroundColor={backgroundColor}
                transparent={transparent} />
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

/**
 * Contains Options related to layers
 * @param {*} props 
 */
function LayerOptions(props) {
    const {paths, setPaths, setActive} = props;

    return (
        <span>
            <AddLayer 
                paths={paths} 
                setPaths={setPaths}
                setActive={setActive} />
        </span>
    );
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
            transparent,
            setTransparent,
            width, 
            height} = props;
    return (
        <div className="canvas-control">
            <BackgroundOptions 
                transparent={transparent}
                setTransparent={setTransparent}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor} />
            <LayerOptions 
                paths={paths} 
                setPaths={setPaths}
                setActive={setActive} />
            <BrushOptions
                brushSize={brushSize}
                setBrushSize={setBrushSize}
                color={color}
                setColor={setColor} />

            <DownloadOptions 
                paths={paths} 
                width={width} 
                height={height} 
                backgroundColor={backgroundColor}
                transparent={transparent} />
        </div>
    );
}

export default CanvasControl;