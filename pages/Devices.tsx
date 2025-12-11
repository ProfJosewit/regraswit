import React, { useState, useRef } from 'react';
import { DEVICES } from '../data';
import * as Icons from 'lucide-react';
import { Boat } from '../components/Luna';
import { TTSButton } from '../components/TTSButton';
import { ChevronRight, ChevronLeft, Map as MapIcon, Database, Cpu, Wifi, Zap, Server, ShieldCheck, Binary } from 'lucide-react';

interface DevicesProps {
  onSelectDevice: (id: string) => void;
}

// Custom sort order based on the "Trail" requirement
const TRAIL_ORDER = [
  'tablet',       // "Computador/Tela"
  'mouse',        // Mouse
  'keyboard',     // Teclado
  'headset',      // Fone
  'alexa',        // Alexa
  'camera',       // Câmera
  'smart-watch',  // Relógio
  'vr-goggles',   // VR
  'smart-bulb',   // Luz
  'chroma'        // Chroma Key
];

export const Devices: React.FC<DevicesProps> = ({ onSelectDevice }) => {
  const [activeStep, setActiveStep] = useState<number>(-1); 
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sortedDevices = TRAIL_ORDER.map(id => DEVICES.find(d => d.id === id)).filter(Boolean) as typeof DEVICES;

  const handleStep = (index: number) => {
    if (index < 0 || index >= sortedDevices.length) return;
    
    // If clicking the active step, navigate to details
    if (activeStep === index) {
        onSelectDevice(sortedDevices[index].id);
        return;
    }

    setActiveStep(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex flex-col gap-8 pb-32 relative overflow-hidden bg-gray-50 min-h-screen">
      
      {/* --- TECH MAP DECORATIONS --- */}
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute top-20 right-10 text-wit-200 pointer-events-none animate-pulse"><Wifi size={80} /></div>
      <div className="absolute top-[40%] left-5 text-wit-200 pointer-events-none"><Binary size={60} /></div>
      <div className="absolute bottom-40 right-20 text-wit-200 pointer-events-none"><Cpu size={100} /></div>
      
      {/* --- CONTENT --- */}

      {/* Map Header */}
      <div className="text-center mb-4 relative z-10 pt-6">
        <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-[0_4px_0_rgba(34,197,94,0.4)] border-2 border-wit-500">
            <h2 className="text-3xl md:text-4xl font-black text-wit-900 tracking-tight flex items-center justify-center gap-3 uppercase font-mono">
                <MapIcon className="text-wit-600" size={32} />
                Circuito WIT
            </h2>
            <p className="text-wit-600 font-bold mt-1 font-mono text-sm tracking-wide">Nível: Iniciante &gt; Explorando Hardware</p>
        </div>
      </div>

      {/* The Map Container */}
      <div className="relative max-w-4xl mx-auto w-full px-4 mt-12">
        
        {/* START NODE */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 z-10 flex flex-col items-center">
            <div className="bg-wit-100 p-3 rounded-lg border-2 border-wit-500 shadow-md">
                <Server size={32} className="text-wit-700" />
            </div>
            <span className="bg-wit-800 text-wit-50 text-xs font-bold px-3 py-1 rounded mt-2 shadow-sm uppercase tracking-widest font-mono">Início</span>
        </div>

        {/* THE PATH (Circuit Line) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 md:translate-x-0 z-0">
            {/* The colored road - Neon Green Line */}
            <div className="w-full h-full bg-wit-200 border-x-2 border-wit-300 relative">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-wit-400 to-transparent opacity-50 animate-pulse"></div>
            </div>
        </div>

        <div className="flex flex-col gap-28 relative z-10 pt-8">
            {sortedDevices.map((device, index) => {
                const Icon = Icons[device.icon as keyof typeof Icons] as React.ElementType;
                const isActive = activeStep === index;
                const isPast = activeStep > index;
                const isEven = index % 2 === 0;

                return (
                    <div 
                        key={device.id} 
                        ref={el => itemRefs.current[index] = el}
                        className={`flex items-center md:justify-between w-full relative min-h-[160px]`}
                    >
                        {/* LEFT SIDE CONTENT */}
                        <div className="hidden md:flex w-[42%] justify-end pr-12 relative">
                            {/* Decor */}
                            {isEven && <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-wit-200"><Cpu size={48} /></div>}
                            
                            {isEven && (
                                <TreasureCard 
                                    device={device} 
                                    isActive={isActive} 
                                    onClick={() => handleStep(index)}
                                    align="right"
                                />
                            )}
                        </div>

                        {/* CENTER: The Map Node & Robot Boat */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 md:translate-x-0 flex flex-col items-center justify-center w-24 z-20">
                            
                            {/* THE ROBOT BOAT */}
                            <div className={`
                                absolute -bottom-10 transition-all duration-1000 ease-in-out z-40 pointer-events-none
                                ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'}
                            `}>
                                <div className="transform scale-75 origin-bottom drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                                    <Boat mood="happy" />
                                </div>
                            </div>

                            {/* The Node Button (Tech Hexagon-ish or Circle) */}
                            <button 
                                onClick={() => handleStep(index)}
                                className={`
                                    relative w-20 h-20 rounded-full border-[4px] flex items-center justify-center shadow-lg transition-all duration-300 z-20 overflow-hidden bg-white
                                    ${isActive 
                                        ? 'border-wit-500 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.6)] ring-4 ring-wit-200' 
                                        : isPast 
                                            ? 'border-wit-300 bg-wit-50 text-wit-400' 
                                            : 'border-gray-200 text-gray-300 hover:border-wit-300'}
                                `}
                            >
                                {isPast ? (
                                    <Icons.Check className="w-10 h-10" strokeWidth={4} />
                                ) : isActive ? (
                                     <Icon className="text-wit-600 w-10 h-10 animate-pulse relative z-10" />
                                ) : (
                                    <span className="font-mono font-bold text-2xl">{index + 1}</span>
                                )}
                            </button>
                            
                            {/* Step Label */}
                            {isActive && (
                                <div className="absolute -bottom-10 whitespace-nowrap bg-wit-600 px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-md font-mono border border-wit-400">
                                    Processando...
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE CONTENT */}
                        <div className="flex-1 md:w-[42%] pl-16 md:pl-12 relative">
                             {!isEven && <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 text-wit-200"><Zap size={48} /></div>}

                            <div className="md:hidden">
                                <TreasureCard 
                                    device={device} 
                                    isActive={isActive} 
                                    onClick={() => handleStep(index)}
                                    align="left"
                                />
                            </div>
                            
                            <div className="hidden md:block">
                                {!isEven && (
                                    <TreasureCard 
                                        device={device} 
                                        isActive={isActive} 
                                        onClick={() => handleStep(index)}
                                        align="left"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

             {/* DATA VAULT - END */}
            <div className="flex flex-col items-center justify-center relative z-20 pb-32">
                <div className={`
                    relative w-32 h-32 flex items-center justify-center transform transition-all duration-700
                    ${activeStep >= sortedDevices.length - 1 ? 'scale-110' : 'scale-100 opacity-80'}
                `}>
                     {/* Vault Icon */}
                     <div className="bg-gradient-to-br from-wit-500 to-wit-700 p-6 rounded-2xl shadow-[0_10px_0_#14532d] border-t border-wit-400 z-10">
                        <Database size={64} className="text-white drop-shadow-md" />
                     </div>

                     {/* Glow */}
                     <div className="absolute inset-0 bg-wit-400 blur-2xl opacity-40 animate-pulse"></div>
                </div>
                
                <div className="mt-8 bg-gray-900 text-wit-400 font-mono font-bold px-8 py-3 rounded border border-wit-500 shadow-xl uppercase tracking-widest animate-bounce flex items-center gap-2">
                    <ShieldCheck size={20} className="text-wit-500" />
                    Dados Coletados!
                </div>
            </div>
        </div>
      </div>

      {/* Navigation Controls (Floating Tech Bar) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white p-2 pr-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-wit-200 z-50 scale-90 md:scale-100">
        <button 
            onClick={() => handleStep(Math.max(0, activeStep - 1))}
            disabled={activeStep <= 0}
            className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center disabled:opacity-30 transition-colors border-2 border-gray-300"
        >
            <ChevronLeft size={32} />
        </button>
        
        <div className="px-4 text-center min-w-[120px]">
            <div className="text-[10px] text-wit-600 font-bold uppercase tracking-wider mb-1 font-mono">Progresso</div>
            <div className="text-2xl font-black text-gray-800 leading-none font-mono">
                {activeStep === -1 ? '0' : activeStep + 1}<span className="text-gray-400 text-lg">/{sortedDevices.length}</span>
            </div>
        </div>

        <button 
            onClick={() => handleStep(Math.min(sortedDevices.length - 1, activeStep + 1))}
            disabled={activeStep >= sortedDevices.length - 1}
            className="w-14 h-14 rounded-full bg-wit-500 hover:bg-wit-600 text-white flex items-center justify-center disabled:opacity-30 shadow-md transition-colors border-2 border-wit-400"
        >
            <ChevronRight size={32} />
        </button>
      </div>

    </div>
  );
};

// Component styled like a Digital Tablet/Card
const TreasureCard = ({ device, isActive, onClick, align }: { device: any, isActive: boolean, onClick: () => void, align: 'left' | 'right' }) => {
    return (
        <div 
            onClick={onClick}
            className={`
                bg-white rounded-lg p-6 shadow-sm border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group
                ${isActive 
                    ? 'border-wit-500 shadow-[0_10px_20px_rgba(34,197,94,0.15)] scale-105 opacity-100 translate-x-0 z-30' 
                    : 'border-gray-200 hover:border-wit-300 opacity-70 grayscale-[0.5]'}
                ${align === 'right' ? 'text-right' : 'text-left'}
            `}
        >
            {/* Tech Header Strip */}
            <div className={`absolute top-0 left-0 w-full h-1 ${isActive ? 'bg-wit-500' : 'bg-gray-200'}`}></div>

            <h3 className={`text-2xl font-black mb-2 leading-tight font-sans ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                {device.name}
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-snug font-medium mb-3 font-mono text-sm">
                {device.fullDescription}
            </p>

            {isActive && (
                <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`} onClick={(e) => e.stopPropagation()}>
                    <TTSButton text={`${device.name}. ${device.fullDescription}`} label="Ouvir Dados" />
                </div>
            )}
        </div>
    )
}
