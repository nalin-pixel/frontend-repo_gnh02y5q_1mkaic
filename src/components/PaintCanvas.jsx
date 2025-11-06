import React, { useEffect, useRef, useState } from 'react';

export default function PaintCanvas({ template, color, size, isEraser, onChangeImage }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);

  // Initialize canvas with template
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = template?.src || '';
    img.onload = () => {
      canvas.width = template.size.width;
      canvas.height = template.size.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      saveSnapshot();
      emitChange();
    };
    imgRef.current = img;
  }, [template]);

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    setHistory((h) => [...h, canvas.toDataURL('image/png')]);
  };

  const emitChange = () => {
    const canvas = canvasRef.current;
    onChangeImage && onChangeImage(canvas.toDataURL('image/png'));
  };

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = size;
    ctx.strokeStyle = isEraser ? 'rgba(0,0,0,0)' : color;
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';

    ctx.beginPath();
    ctx.moveTo(
      (e.nativeEvent.clientX - rect.left) * (canvasRef.current.width / rect.width),
      (e.nativeEvent.clientY - rect.top) * (canvasRef.current.height / rect.height)
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(
      (e.nativeEvent.clientX - rect.left) * (canvasRef.current.width / rect.width),
      (e.nativeEvent.clientY - rect.top) * (canvasRef.current.height / rect.height)
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSnapshot();
    emitChange();
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // current
    const prev = newHistory[newHistory.length - 1];
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistory(newHistory);
      emitChange();
    };
    img.src = prev;
  };

  const handleClear = () => {
    if (!imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
    saveSnapshot();
    emitChange();
  };

  const handleExport = () => {
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.id || 'design'}.png`;
    a.click();
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex-1 w-full overflow-auto rounded-xl border bg-white p-3">
        <div className="w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="max-w-full h-auto border shadow-sm"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      {/* Controls passed to parent via render props style */}
      <div className="hidden" aria-hidden>
        <button onClick={handleUndo} id="canvas-undo" />
        <button onClick={handleClear} id="canvas-clear" />
        <button onClick={handleExport} id="canvas-export" />
      </div>
    </div>
  );
}
