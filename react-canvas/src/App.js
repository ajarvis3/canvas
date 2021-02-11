import {useState} from "react";

import './App.css';
import Canvas from './Canvas';

function App() {
  const scale = .8;
  const [width, setWidth] = useState(window.outerHeight * scale * 1.5);
  const [height, setHeight] = useState(window.outerHeight * scale);

  window.onresize = () => {
    setWidth(window.outerHeight * scale * 1.5);
    setHeight(window.outerHeight * scale);
  }

  return (
    <div className="App">
      <Canvas width={width} height={height} />
    </div>
  );
}

export default App;
