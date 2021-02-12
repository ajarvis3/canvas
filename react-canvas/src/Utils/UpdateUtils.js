export function updatePath(event, width, height, paths, setPaths, index) {
    const newPaths = paths.slice();
    const currPath = newPaths[index][newPaths[index].length - 1];
    currPath.push([event.nativeEvent.offsetX / width, 
        event.nativeEvent.offsetY / height]);
    setPaths(newPaths);
}

export function updateRect(event, width, height, paths, setPaths, index) {
    const newPaths = paths.slice();
    const currPath = newPaths[index][newPaths[index].length - 1];
    currPath[4] = [event.nativeEvent.offsetX / width, 
        event.nativeEvent.offsetY / height];
    setPaths(newPaths);
}
