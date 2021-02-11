import {useEffect, useRef, useState} from 'react';
import {drawPath} from './Utils/DrawingUtils';
import {updatePath} from './Utils/UpdateUtils';
import "./Canvas.css";

function BrushSizer(props) {
    const {brushSize, setBrushSize} = props;

    function handleChange(event) {
        setBrushSize(event.target.value);
    }

    return (
        <span>
            <label>Brush Size:</label>
            <input type="number" value={brushSize}  onChange={handleChange}/>
        </span> 
    )
}

function Download(props) {
    const {canvas} = props;
    const aTag = useRef();

    function onClick() {
        const img = canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
        aTag.current.setAttribute("href", img);
    }

    return (
        <a ref={aTag} download="canvas.png">
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
    const {width, height, color, canvas, brushSize} = props;
    const [paths, setPaths] = useState([]);

    // Path format [color, size, start, [points]]
    function handleMouseDown(event) {
        if (event.buttons & 1) {
            const newPaths = paths.slice();
            newPaths.push(["path",
                color, brushSize, 
                [event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]]);
            setPaths(newPaths);    
        }
    }

    function handleMouseMove(event) {
        if (event.buttons & 1) {
            updatePath(event, width, height, paths, setPaths);
        }
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        paths.forEach((value) => {
            switch (value[0]) {
                case("path"):
                    drawPath(ctx, width, height, value);
                    break;
                default:
                    console.error("undefined thingy");
            }
        });
    });

    return (
        <canvas className='canvas'
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
    const canvas = useRef();
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);

    return (
        <div>
            <div>
                <BrushSizer brushSize={brushSize} setBrushSize={setBrushSize} />
                <ColorChooser color={color} setColor={setColor} />
                <Download canvas={canvas}/>
            </div>
            <Layer 
                width={width} 
                height={height} 
                brushSize={brushSize}
                color={color} 
                canvas={canvas}/>
        </div>
    )
}

export default Canvas;