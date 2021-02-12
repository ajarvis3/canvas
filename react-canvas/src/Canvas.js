import {useCallback, useEffect, useRef, useState} from 'react';
import { drawCanvas, drawItem } from './Utils/DrawingUtils';
import {updatePath, updateRect} from './Utils/UpdateUtils';
import CanvasControl from "./CanvasControl/CanvasControl";
import LayersDisplay from "./LayersDisplay";
import "./Canvas.css";
import {brushes} from "./Constants";

function Background(props) {
    const {width, height, color, transparent} = props;
    const canvas = useRef();

    useEffect(() => {
        var ctx = canvas.current.getContext('2d');
        if (!transparent) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);    
        } else {
            ctx.clearRect(0, 0, width, height);
        }
    });

    return (
        <canvas className='layer'
            ref={canvas}
            z-index={0}
            width={width}
            height={height}>
        </canvas>
    )

}

/**
 * Area where all drawing will actually happen
 * @param {*} props 
 */
function ScratchSpace(props) {
    const {width, 
        height, 
        color, 
        brushSize, 
        path, 
        setPath, 
        paths,
        setPaths,
        index, 
        brushType} = props;
    const canvas = useRef();

    // Path format [type, color, size, start, [points]]
    const handleMouseDown = useCallback((event) => {
        if (event.buttons & 1) {
            var newPath;
            if (brushType[0] === "Brush" || brushType[0] === "Polygon") {
                newPath = [brushType[0],
                color, brushSize, 
                [event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]];
            } else if (brushType[0] === "Rectangle" || brushType[0] === "Ellipse") {
                newPath = [brushType[0],
                    color, brushSize, 
                    [event.nativeEvent.offsetX / width, 
                    event.nativeEvent.offsetY / height],
                    [event.nativeEvent.offsetX / width, 
                    event.nativeEvent.offsetY / height]];    
            }
            setPath(newPath);    
        }
    }, [color, brushSize, width, height, setPath, brushType]);

    // Updates current drawing
    const handleMouseMove = useCallback((event) => {
        if (event.buttons & 1) {
            if (brushType[0] === "Brush" || brushType[0] === "Polygon") {
                updatePath(event, width, height, path, setPath);
            } else if (brushType[0] === "Rectangle"  || brushType[0] === "Ellipse") {
                updateRect(event, width, height, path, setPath);
            }
        }
    }, [width, height, path, setPath, brushType]);

    const handleMouseUp = useCallback((event) => {
        const newPaths = paths.slice();
        const layer = newPaths[index];
        layer.push(path);
        setPaths(newPaths);
        setPath([]);
    }, [path, setPath, paths, setPaths, index]);

    // Draws on canvas after render
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        drawItem(ctx, width, height, path);
    }, [path, width, height, canvas]);

    return (
        <canvas className='layer'
            z-index={2}
            ref={canvas}
            width={width}
            height={height}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
        </canvas>
    )    
}

/**
 * A single layer
 * @param {*} props 
 */
function Layer(props) {
    const {width, 
            height, 
            paths} = props;
    const canvas = useRef();

    // Draws on canvas after render
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        drawCanvas(ctx, paths, width, height);
    }, [paths, width, height, canvas]);

    return (
        <canvas className='layer'
            z-index={1}
            ref={canvas}
            width={width}
            height={height}>
        </canvas>
    )
}

function Canvas(props) {
    const {width, height} = props;
    // const canvas = useRef();
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [brushType, setBrushType] = useState(brushes[0]);
    const [path, setPath] = useState([]);
    const [paths, setPaths] = useState([[]]);
    const [active, setActive] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [transparent, setTransparent] = useState(true);

    return (
        <div className="canvas">
            <div className="canvas-container">
                <CanvasControl
                    paths={paths}
                    setPaths={setPaths}
                    setActive={setActive}
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    color={color}
                    setColor={setColor}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    transparent={transparent}
                    setTransparent={setTransparent}
                    width={width}
                    height={height}
                    brushType={brushType}
                    setBrushType={setBrushType}
                />
                <div id="layer-container" width={width * 1.25} height={height * 1.25}>
                    <Background 
                        width={width} 
                        height={height} 
                        color={backgroundColor} 
                        transparent={transparent} />
                    <Layer
                        width={width}
                        height={height}
                        paths={paths}
                        index={active} />
                    <ScratchSpace
                        width={width}
                        height={height}
                        color={color}
                        brushSize={brushSize}
                        path={path}
                        setPath={setPath}
                        paths={paths}
                        setPaths={setPaths}
                        index={active}
                        brushType={brushType} />
                </div>
            </div>
            <LayersDisplay 
                paths={paths} 
                width={width / 10} 
                height={height / 10}
                active={active}
                setActive={setActive} />
        </div>
    )
}

export default Canvas;