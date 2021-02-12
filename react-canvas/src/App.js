import {useEffect, useState} from "react";

import './App.css';
import Canvas from './Canvas';

function App() {
  const scale = .75;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function setDimensions() {
    const body = window.document.body
    const base = body.clientHeight * 1.5 > body.clientWidth ? 
                  body.clientWidth * 2 / 3: body.clientHeight;
    setWidth(base * scale * 1.5);
    setHeight(base * scale);           
  }

  window.onresize = () => {
    setDimensions()
  }

  useEffect(() => {
    setDimensions();
  }, []);

  return (
    <div className="App">
      <Canvas width={width} height={height} />
    </div>
  );
}

export default App;
