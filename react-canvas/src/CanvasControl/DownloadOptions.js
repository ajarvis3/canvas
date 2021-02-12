import {useRef} from 'react';
import {BsDownload} from 'react-icons/bs';

import {drawCanvas} from "../Utils/DrawingUtils";

import "./CanvasControl.css"

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
    drawCanvas(ctx, paths, width, height);

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

export default DownloadOptions;
