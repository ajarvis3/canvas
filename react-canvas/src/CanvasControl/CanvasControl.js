import BackgroundOptions from "./BackgroundOptions";
import BrushOptions from "./BrushOptions";
import DownloadOptions from "./DownloadOptions";
import LayerOptions from "./LayerOptions";

import "./CanvasControl.css";

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
            height,
            brushType,
            setBrushType} = props;
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
                brushType={brushType}
                setBrushType={setBrushType}
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