import React, { useRef, useState, useEffect } from 'react';
import '../App.css'
function Board() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]); 
  const [color, setColor] = useState('#000000'); 

 
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth; 
    canvas.height = 600; 
  }, []);

  const startDrawing = (e) => {
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    saveCanvasState();  //save the state before making new stat
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = color;
    context.stroke();
    
  };

  const stopDrawing = () => {
    
    setIsDrawing(false);
    
  };


  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height); 
    setHistory((prevHistory) => [...prevHistory, imageData]); 
  };

 
  const undo = () => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const previousState = history[history.length - 1];
      context.putImageData(previousState, 0, 0); 
      setHistory(history.slice(0, history.length - 1)); 
    }
  };

  
  const clearCanvas = () => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]); 
  };

  return (
    <div>
        <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)} // Update the color
            style={{ marginTop: '10px' }}
        />
        <button onClick={clearCanvas} style={{ marginTop: '10px' }}> Clear Canvas</button>
        <button onClick={undo} style={{ marginTop: '10px' }}>
        Undo
        </button>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            style={{ 
            width: '100%', 
            height: '600px', 
            border: '1px solid black' 
            }}
        />
      
    </div>
  );
}

export default Board;
