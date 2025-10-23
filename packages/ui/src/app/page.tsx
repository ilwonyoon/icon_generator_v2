'use client';

import { useState } from 'react';
import { createDNA, ARCHETYPES } from '@icon-builder/shared-types';
import { compileIcon, compiledIconToSVG } from '@icon-builder/compiler';
import type { CompiledIcon } from '@icon-builder/compiler';

export default function Home() {
  // State
  const [selectedArchetype, setSelectedArchetype] = useState('home');
  const [style, setStyle] = useState<'outline' | 'filled'>('outline');
  const [compiledIcon, setCompiledIcon] = useState<CompiledIcon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parameters, setParameters] = useState<Record<string, number | boolean>>({});

  // DNA controls state
  const [dnaStrokeWidth, setDnaStrokeWidth] = useState(1.5);
  const [dnaStrokeLineCap, setDnaStrokeLineCap] = useState<'butt' | 'round' | 'square'>('round');
  const [dnaStrokeLineJoin, setDnaStrokeLineJoin] = useState<'miter' | 'round' | 'bevel'>('round');
  const [dnaColorMode, setDnaColorMode] = useState<'currentColor' | 'fixed'>('currentColor');
  const [dnaPrimaryColor, setDnaPrimaryColor] = useState('#000000');

  // Create dynamic DNA profile based on controls
  const dna = createDNA('default', 'Default', {
    gridSize: 1,
    viewBoxSize: 24,
    liveAreaInset: 2,
    strokeWidth: dnaStrokeWidth,
    strokeLineCap: dnaStrokeLineCap,
    strokeLineJoin: dnaStrokeLineJoin,
    allowedRadii: [0, 2, 4],
    allowedAngles: [0, 45, 90],
    colorMode: dnaColorMode,
    primaryColor: dnaColorMode === 'fixed' ? dnaPrimaryColor : undefined,
  });

  // Get current archetype
  const archetype = ARCHETYPES[selectedArchetype];

  // Initialize parameters when archetype changes
  const handleArchetypeChange = (id: string) => {
    setSelectedArchetype(id);
    const arch = ARCHETYPES[id];
    if (arch) {
      setParameters({ ...arch.defaults });
    }
  };

  // Compile icon
  const handleCompile = () => {
    try {
      setError(null);
      const icon = compileIcon(selectedArchetype, parameters, dna, style);
      setCompiledIcon(icon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCompiledIcon(null);
    }
  };

  // Generate SVG markup
  const svgMarkup = compiledIcon ? compiledIconToSVG(compiledIcon) : null;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Icon Builder
          </h1>
          <p className="text-lg text-gray-600">
            A deterministic, parametric icon generation system
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Archetype Selection & Parameters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Archetypes
              </h2>

              {/* Archetype List */}
              <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                {Object.values(ARCHETYPES).map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => handleArchetypeChange(arch.id)}
                    className={`w-full text-left px-4 h-btn rounded-btn transition-colors font-medium ${
                      selectedArchetype === arch.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    {arch.name}
                  </button>
                ))}
              </div>

              {/* Parameters */}
              {archetype && (
                <div>
                  <h3 className="font-semibold mb-3 text-black">
                    Parameters
                  </h3>
                  <div className="space-y-4">
                    {archetype.parameters.map((param) => (
                      <div key={param.id}>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          {param.name}
                          {param.unit && <span className="text-xs ml-1">({param.unit})</span>}
                        </label>
                        {param.type === 'number' ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="range"
                              min={param.min}
                              max={param.max}
                              step={param.step || 0.5}
                              value={parameters[param.id] ?? param.default}
                              onChange={(e) => {
                                setParameters({
                                  ...parameters,
                                  [param.id]: parseFloat(e.target.value),
                                });
                              }}
                              className="flex-1"
                            />
                            <span className="text-sm font-mono w-12 text-right text-gray-600">
                              {(parameters[param.id] ?? param.default).toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <input
                            type="checkbox"
                            checked={(parameters[param.id] as boolean) ?? (param.default as boolean)}
                            onChange={(e) => {
                              setParameters({
                                ...parameters,
                                [param.id]: e.target.checked,
                              });
                            }}
                            className="w-4 h-4"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {param.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* DNA Controls */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-4 text-black">
                      Icon DNA Properties
                    </h3>
                    <div className="space-y-4">
                      {/* Stroke Width */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Stroke Width (px)
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.25"
                            value={dnaStrokeWidth}
                            onChange={(e) => setDnaStrokeWidth(parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-mono w-10 text-right text-gray-600">
                            {dnaStrokeWidth.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Line Cap */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Line Cap
                        </label>
                        <div className="flex gap-2">
                          {(['butt', 'round', 'square'] as const).map((cap) => (
                            <button
                              key={cap}
                              onClick={() => setDnaStrokeLineCap(cap)}
                              className={`flex-1 h-btn rounded-btn text-xs font-medium transition-colors ${
                                dnaStrokeLineCap === cap
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-100 text-black hover:bg-gray-200'
                              }`}
                            >
                              {cap.charAt(0).toUpperCase() + cap.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Line Join */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Line Join
                        </label>
                        <div className="flex gap-2">
                          {(['miter', 'round', 'bevel'] as const).map((join) => (
                            <button
                              key={join}
                              onClick={() => setDnaStrokeLineJoin(join)}
                              className={`flex-1 h-btn rounded-btn text-xs font-medium transition-colors ${
                                dnaStrokeLineJoin === join
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-100 text-black hover:bg-gray-200'
                              }`}
                            >
                              {join.charAt(0).toUpperCase() + join.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Mode */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Color Mode
                        </label>
                        <div className="flex gap-2 mb-2">
                          {(['currentColor', 'fixed'] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setDnaColorMode(mode)}
                              className={`flex-1 h-btn rounded-btn text-xs font-medium transition-colors ${
                                dnaColorMode === mode
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-100 text-black hover:bg-gray-200'
                              }`}
                            >
                              {mode === 'currentColor' ? 'Current Color' : 'Fixed Color'}
                            </button>
                          ))}
                        </div>
                        {dnaColorMode === 'fixed' && (
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={dnaPrimaryColor}
                              onChange={(e) => setDnaPrimaryColor(e.target.value)}
                              className="w-10 h-8 rounded-btn cursor-pointer"
                            />
                            <span className="text-sm font-mono text-gray-600">
                              {dnaPrimaryColor}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Style Selection */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 text-black">
                      Style
                    </h3>
                    <div className="flex gap-2">
                      {(['outline', 'filled'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStyle(s)}
                          className={`flex-1 h-btn rounded-btn text-sm font-medium transition-colors ${
                            style === s
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-black hover:bg-gray-200'
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compile Button */}
                  <button
                    onClick={handleCompile}
                    className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-bold h-btn rounded-btn transition-colors"
                  >
                    Compile
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Center & Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-black">
                Preview
              </h2>

              {compiledIcon ? (
                <div className="space-y-8">
                  {/* Preview at Different Sizes */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-gray-700">
                      Sizes
                    </h3>
                    <div className="flex gap-8 items-start flex-wrap">
                      {[16, 24, 32].map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                          <div
                            className="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200"
                            style={{ width: size * 2, height: size * 2 }}
                          >
                            <svg
                              viewBox={compiledIcon.viewBox}
                              style={{
                                width: size,
                                height: size,
                                color: 'currentColor',
                              }}
                              className="text-black"
                            >
                              {compiledIcon.paths.map((path, idx) => (
                                <path
                                  key={idx}
                                  d={path.d}
                                  fill={path.fill}
                                  stroke={path.stroke}
                                  strokeWidth={path.strokeWidth}
                                  strokeLinecap={path.strokeLinecap as any}
                                  strokeLinejoin={path.strokeLinejoin as any}
                                />
                              ))}
                            </svg>
                          </div>
                          <p className="text-xs text-gray-600">{size}px</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG Code */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">
                      SVG Code
                    </h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                      {svgMarkup}
                    </pre>
                    <button
                      onClick={() => {
                        if (svgMarkup) {
                          navigator.clipboard.writeText(svgMarkup);
                          alert('Copied to clipboard!');
                        }
                      }}
                      className="mt-2 px-4 h-btn bg-gray-700 hover:bg-gray-600 text-white rounded-btn text-sm font-medium"
                    >
                      Copy SVG
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <p className="text-lg mb-2">No icon compiled yet</p>
                    <p className="text-sm">Adjust parameters and click Compile to see preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
