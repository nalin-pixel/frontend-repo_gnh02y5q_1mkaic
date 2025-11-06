import React from 'react';

const templates = [
  {
    id: 'shirt',
    name: 'Shirt Template',
    size: { width: 585, height: 559 },
    src: 'https://images.unsplash.com/photo-1545177233-efa3e83e1372?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTaGlydCUyMFRlbXBsYXRlfGVufDB8MHx8fDE3NjI0NjQ5OTJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'pants',
    name: 'Pants Template',
    size: { width: 585, height: 559 },
    src: 'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYW50cyUyMFRlbXBsYXRlfGVufDB8MHx8fDE3NjI0NjQ5OTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'tshirt',
    name: 'T-Shirt Template',
    size: { width: 512, height: 512 },
    src: 'https://images.unsplash.com/photo-1564864310852-e1e98eb07010?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxULVNoaXJ0JTIwVGVtcGxhdGV8ZW58MHwwfHx8MTc2MjQ2NDk5NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
];

export default function TemplatePicker({ selected, onSelect }) {
  return (
    <div className="w-full p-3 rounded-xl bg-white/70 backdrop-blur border shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Template</h3>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl)}
            className={`p-2 rounded-lg border overflow-hidden bg-white hover:shadow-md transition ${
              selected?.id === tpl.id ? 'ring-2 ring-black' : ''
            }`}
          >
            <img src={tpl.src} alt={tpl.name} className="w-full h-24 object-contain bg-gray-50" />
            <div className="text-xs text-gray-700 mt-1 text-center">{tpl.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
