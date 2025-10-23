'use client';

import { useState } from 'react';
import { createDNA, ARCHETYPES } from '@icon-builder/shared-types';
import { compileIcon, compiledIconToSVG } from '@icon-builder/compiler';
import type { CompiledIcon } from '@icon-builder/compiler';

export default function Home() {
  // Create a default DNA profile
  const dna = createDNA('default', 'Default', {
    gridSize: 1,
    viewBoxSize: 24,
    liveAreaInset: 2,
    strokeWidth: 1.5,
    allowedRadii: [0, 2, 4],
    allowedAngles: [0, 45, 90],
  });

  // State
  const [selectedArchetype, setSelectedArchetype] = useState('home');
  const [style, setStyle] = useState<'outline' | 'filled'>('outline');
  const [compiledIcon, setCompiledIcon] = useState<CompiledIcon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parameters, setParameters] = useState<Record<string, number | boolean>>({});

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Icon Builder
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            A deterministic, parametric icon generation system
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Archetype Selection & Parameters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Archetypes
              </h2>

              {/* Archetype List */}
              <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                {Object.values(ARCHETYPES).map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => handleArchetypeChange(arch.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedArchetype === arch.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {arch.name}
                  </button>
                ))}
              </div>

              {/* Parameters */}
              {archetype && (
                <div>
                  <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">
                    Parameters
                  </h3>
                  <div className="space-y-4">
                    {archetype.parameters.map((param) => (
                      <div key={param.id}>
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
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
                            <span className="text-sm font-mono w-12 text-right text-slate-600 dark:text-slate-400">
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
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {param.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Style Selection */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                      Style
                    </h3>
                    <div className="flex gap-2">
                      {(['outline', 'filled'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStyle(s)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                            style === s
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
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
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Compile
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-6 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Center & Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
                Preview
              </h2>

              {compiledIcon ? (
                <div className="space-y-8">
                  {/* Preview at Different Sizes */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                      Sizes
                    </h3>
                    <div className="flex gap-8 items-start flex-wrap">
                      {[16, 24, 32].map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                          <div
                            className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                            style={{ width: size * 2, height: size * 2 }}
                          >
                            <svg
                              viewBox={compiledIcon.viewBox}
                              style={{
                                width: size,
                                height: size,
                                color: 'currentColor',
                              }}
                              className="text-slate-900 dark:text-white"
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
                          <p className="text-xs text-slate-600 dark:text-slate-400">{size}px</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG Code */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                      SVG Code
                    </h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                      {svgMarkup}
                    </pre>
                    <button
                      onClick={() => {
                        if (svgMarkup) {
                          navigator.clipboard.writeText(svgMarkup);
                          alert('Copied to clipboard!');
                        }
                      }}
                      className="mt-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm"
                    >
                      Copy SVG
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-slate-500 dark:text-slate-400">
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
