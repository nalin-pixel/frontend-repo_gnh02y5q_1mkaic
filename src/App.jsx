import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layers } from 'lucide-react';
import Toolbar from './components/Toolbar';
import TemplatePicker from './components/TemplatePicker';
import PaintCanvas from './components/PaintCanvas';
import Preview3D from './components/Preview3D';

export default function App() {
  const [template, setTemplate] = useState({
    id: 'shirt',
    name: 'Shirt Template',
    size: { width: 585, height: 559 },
    src: 'https://images.unsplash.com/photo-1545177233-efa3e83e1372?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTaGlydCUyMFRlbXBsYXRlfGVufDB8MHx8fDE3NjI0NjQ5OTJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  });

  const [color, setColor] = useState('#ff3d00');
  const [size, setSize] = useState(12);
  const [isEraser, setIsEraser] = useState(false);
  const [image, setImage] = useState(null);

  // Wire toolbar actions to canvas via hidden buttons to keep responsibilities separated
  const undoRef = useRef(null);
  const clearRef = useRef(null);
  const exportRef = useRef(null);

  useEffect(() => {
    undoRef.current = document.getElementById('canvas-undo');
    clearRef.current = document.getElementById('canvas-clear');
    exportRef.current = document.getElementById('canvas-export');
  }, []);

  const handleUndo = () => undoRef.current && undoRef.current.click();
  const handleClear = () => clearRef.current && clearRef.current.click();
  const handleExport = () => exportRef.current && exportRef.current.click();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-semibold text-xl">Roblox Clothing Painter</h1>
            <p className="text-sm text-gray-600">Paint on official templates and preview in 3D</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 flex flex-col gap-4">
          <Toolbar
            color={color}
            setColor={setColor}
            size={size}
            setSize={setSize}
            isEraser={isEraser}
            setIsEraser={setIsEraser}
            onUndo={handleUndo}
            onClear={handleClear}
            onExport={handleExport}
          />

          <div className="h-[620px]">
            <PaintCanvas
              template={template}
              color={color}
              size={size}
              isEraser={isEraser}
              onChangeImage={setImage}
            />
          </div>
        </section>

        <aside className="lg:col-span-4 flex flex-col gap-4">
          <TemplatePicker selected={template} onSelect={setTemplate} />
          <div className="h-[420px]">
            <Preview3D image={image} template={template} />
          </div>
        </aside>
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">
        Not affiliated with Roblox. Use exports as textures for your uploads.
      </footer>
    </div>
  );
}
