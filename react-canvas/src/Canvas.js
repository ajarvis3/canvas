import {useCallback, useEffect, useRef, useState} from 'react';
import { drawLayer } from './Utils/DrawingUtils';
import {updatePath} from './Utils/UpdateUtils';
import CanvasControl from "./CanvasControl";
import LayersDisplay from "./LayersDisplay";
import "./Canvas.css";

function Background(props) {
    const {width, height, color} = props;
    const canvas = useRef();

    useEffect(() => {
        var ctx = canvas.current.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
    });

    return (
        <canvas className='layer'
            ref={canvas}
            z-index={-1}
            width={width}
            height={height}>
        </canvas>
    )

}


/**
 * A single layer
 * @param {*} props 
 */
function Layer(props) {
    const {width, height, color, brushSize, paths, setPaths, index, active} = props;
    const canvas = useRef();

    // Path format [type, color, size, start, [points]]
    const handleMouseDown = useCallback((event) => {
        if (event.buttons & 1) {
            const newPaths = paths.slice();
            newPaths[index].push(["path",
                color, brushSize, 
                [event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]]);
            setPaths(newPaths);    
        }
    }, [paths, color, brushSize, width, height, setPaths, index]);

    const handleMouseMove = useCallback((event) => {
        if (event.buttons & 1) {
            updatePath(event, width, height, paths, setPaths, index);
        }
    }, [width, height, paths, setPaths, index]);

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        drawLayer(ctx, paths[index], width, height);
    }, [paths, width, height, canvas, index]);

    return (
        <canvas className='layer'
            z-index={!active ? index : paths.length}
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
    const [paths, setPaths] = useState([[]]);
    const [active, setActive] = useState();
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    const layers = paths.map((value, index) => {
        return <Layer
            active={active===index}
            width={width}
            height={height}
            brushSize={brushSize}
            color={color}
            paths={paths}
            setPaths={setPaths}
            index={index}
            key={index} />
    });
    // bit hacky, but it works now
    layers.push(layers.splice(active, 1));

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
                    width={width}
                    height={height}
                />
                <div id="layer-container" width={width * 1.25} height={height * 1.25}>
                    <Background width={width} height={height} color={backgroundColor} />
                    {layers}
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