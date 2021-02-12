import {useCallback} from 'react';

import {BsLayersFill} from 'react-icons/bs';

/**
 * Control for adding a layer
 * @param {*} props 
 */
function AddLayer(props) {
    const {paths, setPaths, setActive} = props;

    const handleChange = useCallback(() => {
        const newPaths = paths.slice();
        newPaths.push([]);
        setActive(newPaths.length - 1);
        setPaths(newPaths);
    }, [paths, setPaths, setActive]);

    return (
        <span className="icon-container" onClick={handleChange}>
            <BsLayersFill />
            <span className="tooltiptext">Add a Layer</span>
        </span>
    )
}


/**
 * Contains Options related to layers
 * @param {*} props 
 */
function LayerOptions(props) {
    const {paths, setPaths, setActive} = props;

    return (
        <span>
            <AddLayer 
                paths={paths} 
                setPaths={setPaths}
                setActive={setActive} />
        </span>
    );
}

export default LayerOptions;
