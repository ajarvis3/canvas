import {useEffect, useRef, useState} from 'react';

import "./Canvas.css";

function ColorChooser(props) {
    const {color, setColor} = props;

    function handleChange(event) {
        setColor(event.target.value);
    }

    return (
        <div>
            <input 
                className="color-chooser"
                type="color" 
                value={color} 
                onChange={handleChange} />
        </div>
    )
}

function DrawingArea(props) {
    const {width, height, color} = props;
    const canvas = useRef();
    const [paths, setPaths] = useState([]);

    function handleMouseDown(event) {
        if (event.buttons & 1) {
            const newPaths = paths.slice();
            newPaths.push([color, [event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]]);
            setPaths(newPaths);    
        }
    }

    function handleMouseMove(event) {
        if (event.buttons & 1) {
            const newPaths = paths.slice();
            const currPath = newPaths[newPaths.length - 1];
            currPath.push([event.nativeEvent.offsetX / width, 
                event.nativeEvent.offsetY / height]);
            setPaths(newPaths);
        }
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        paths.forEach((value) => {
            ctx.strokeStyle = value[0];
            ctx.beginPath();
            ctx.moveTo(value[1][0] * width, value[1][1] * height);
            for (let i = 2; i < value.length; i++) {
                ctx.lineTo(value[i][0] * width, value[i][1] * height);
            }
            ctx.stroke();
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
    const [color, setColor] = useState('#000000');
    console.log(color);

    return (
        <div>
            <ColorChooser color={color} setColor={setColor} />
            <DrawingArea width={width} height={height} color={color} />
        </div>
    )
}

export default Canvas;