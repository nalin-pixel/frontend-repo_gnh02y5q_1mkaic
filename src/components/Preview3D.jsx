import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

/*
  This component shows a simple 3D preview area using Spline canvas as a backdrop.
  We overlay the shirt texture as an image preview and simulate a basic turntable.
  For a full Roblox avatar 3D mapping, you'd typically use a custom 3D model and UV map.
*/

export default function Preview3D({ image, template }) {
  const imgRef = useRef(null);

  useEffect(() => {
    // Basic spin animation for the preview image
    let raf;
    let angle = 0;

    const tick = () => {
      angle = (angle + 0.3) % 360;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(-50%, -50%) rotateY(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border bg-white">
      <Spline scene="https://prod.spline.design/IfgQjCiGF6c1TtS0/scene.splinecode" style={{ width: '100%', height: '100%' }} />

      {/* Overlay gradient for readability without blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 rounded-full border border-white/60 bg-white/40 backdrop-blur-sm shadow-xl" />
          {image && (
            <img
              ref={imgRef}
              src={image}
              alt="Design Preview"
              className="absolute left-1/2 top-1/2 w-44 h-44 object-contain shadow-md"
              style={{ transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}
            />
          )}
          {!image && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-600 text-sm">
              Paint on the canvas to preview here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
