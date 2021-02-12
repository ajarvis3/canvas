export function updatePath(event, width, height, path, setPath) {
    const currPath = path.slice();
    currPath.push([event.nativeEvent.offsetX / width, 
        event.nativeEvent.offsetY / height]);
    setPath(currPath);
}

/**
 * Will also use for ellipse
 * @param {*} event 
 * @param {*} width 
 * @param {*} height 
 * @param {*} paths 
 * @param {*} setPaths 
 * @param {*} index 
 */
export function updateRect(event, width, height, path, setPath) {
    const currPath = path.slice();
    currPath[4] = [event.nativeEvent.offsetX / width, 
        event.nativeEvent.offsetY / height];
    setPath(currPath);
}
