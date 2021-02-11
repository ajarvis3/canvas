import {useCallback, useEffect, useRef, useState} from 'react';
import { drawLayer } from './Utils/DrawingUtils';
import {updatePath} from './Utils/UpdateUtils';
import "./Canvas.css";

function AddLayer(props) {
    const {paths, setPaths} = props;

    const handleChange = useCallback(() => {
        const newPaths = paths.slice();
        newPaths.push([]);
        setPaths(newPaths);
    }, [paths, setPaths]);

    return (
        <button onClick={handleChange}>
            Add Layer
        </button>
    )
}

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
    const {paths, width, height} = props;
    const aTag = useRef();
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    console.log(canvas, ctx);
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

function Layer(props) {
    const {width, height, color, brushSize, paths, setPaths, index} = props;
    const canvas = useRef();
    // const [paths, setPaths] = useState([]);

    // Path format [type, color, size, start, [points]]
    function handleMouseDown(event) {
        console.log(index);
        if (event.buttons & 1) {
            const newPaths = paths.slice();
            newPaths[index].push(["path",
                color, brushSize, 
                [event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]]);
            setPaths(newPaths);    
        }
    }

    function handleMouseMove(event) {
        if (event.buttons & 1) {
            updatePath(event, width, height, paths, setPaths, index);
        }
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        drawLayer(ctx, paths[index], width, height);
    }, [paths, width, height, canvas, index]);

    return (
        <canvas className='canvas'
            z-index={index}
            ref={canvas}
            width={width}
            height={height}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}>
        </canvas>
    )
}

function Canvas(props) {
    const {width, height} = props;
    // const canvas = useRef();
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [paths, setPaths] = useState([]);

    const layers = paths.map((value, index) => {
        return <Layer
            width={width}
            height={height}
            brushSize={brushSize}
            color={color}
            paths={paths}
            setPaths={setPaths}
            index={index}
            key={index} />
    })

    return (
        <div>
            <div>
                <AddLayer paths={paths} setPaths={setPaths} />
                <BrushSizer brushSize={brushSize} setBrushSize={setBrushSize} />
                <ColorChooser color={color} setColor={setColor} />
                <Download paths={paths} width={width} height={height}/>
            </div>
            <div id="layer-container" width={width * 1.25} height={height * 1.25}>
                {layers}
            </div>
            {/* <Layer 
                width={width} 
                height={height} 
                brushSize={brushSize}
                color={color} 
                canvas={canvas}/> */}
        </div>
    )
}

export default Canvas;