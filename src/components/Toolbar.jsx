import React from 'react';
import { Eraser, Brush, Undo2, Trash2, Download } from 'lucide-react';

export default function Toolbar({ color, setColor, size, setSize, isEraser, setIsEraser, onUndo, onClear, onExport }) {
  return (
    <div className="w-full flex flex-wrap items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur border shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Color</span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-9 w-9 rounded cursor-pointer border"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Brush</span>
        <input
          type="range"
          min={1}
          max={60}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-40"
        />
        <span className="text-sm text-gray-700 w-10 text-right">{size}px</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEraser(false)}
          className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${!isEraser ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
          title="Brush"
        >
          <Brush className="h-4 w-4" />
          Brush
        </button>
        <button
          onClick={() => setIsEraser(true)}
          className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${isEraser ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
          title="Eraser"
        >
          <Eraser className="h-4 w-4" />
          Eraser
        </button>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button onClick={onUndo} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 flex items-center gap-2" title="Undo">
          <Undo2 className="h-4 w-4" /> Undo
        </button>
        <button onClick={onClear} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 flex items-center gap-2" title="Clear">
          <Trash2 className="h-4 w-4" /> Clear
        </button>
        <button onClick={onExport} className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 rounded-md flex items-center gap-2" title="Export PNG">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
    </div>
  );
}
