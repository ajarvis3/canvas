import {useRef, useEffect, useCallback} from 'react';
import {drawLayer} from "./Utils/DrawingUtils";
import "./LayersDisplay.css"

/**
 * Individual mini-layer
 * @param {*} props 
 */
function MiniLayers(props) {
    const {width, height, paths, index, active, setActive} = props;
    const canvas = useRef();

    const handleClick = useCallback(() => {
        setActive(index);
    }, [setActive, index]);

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        drawLayer(ctx, paths[index], width, height, .1);
    }, [paths, width, height, canvas, index]);

    return (
        <canvas className={`mini-layer ${active && 'active'}`}
            ref={canvas}
            width={width}
            height={height}
            onClick={handleClick}>
        </canvas>
    )
}

/**
 * Display container for mini layers
 * @param {*} props 
 */
function LayersDisplay(props) {
    const {paths, width, height, active, setActive} = props;

    const miniLayers = paths.map((value, index) => {
        return <MiniLayers 
                    width={width}
                    height={height}
                    paths={paths}
                    active={active===index}
                    setActive={setActive}
                    index={index} 
                    key={index} />
    });

    return (
        <div className="mini-layers-display">
            {miniLayers}
        </div>
    )
}

export default LayersDisplay;