export function updatePath(event, width, height, paths, setPaths) {
    const newPaths = paths.slice();
    const currPath = newPaths[newPaths.length - 1];
    currPath.push([event.nativeEvent.offsetX / width, 
        event.nativeEvent.offsetY / height]);
    setPaths(newPaths);
}