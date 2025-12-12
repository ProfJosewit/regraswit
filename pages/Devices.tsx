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

// Top-Down Futuristic Boat Component
const TopDownBoat = () => (
  <div className="relative w-20 h-28 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-bounce-slow z-50">
    <svg viewBox="0 0 60 100" className="w-full h-full overflow-visible">
      {/* Water Wake / Thrust trail */}
      <path d="M10 -20 Q30 -5 50 -20 L30 10 Z" fill="rgba(34,197,94,0.4)" className="animate-pulse" />
      
      {/* Thrusters */}
      <rect x="12" y="5" width="10" height="20" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1" />
      <rect x="38" y="5" width="10" height="20" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1" />
      
      {/* Main Hull - Playful bubbly shape */}
      <path d="M10 20 L50 20 L58 70 Q30 110 2 70 L10 20 Z" fill="#f3f4f6" stroke="#16a34a" strokeWidth="3" />
      
      {/* Central Core / Cockpit */}
      <circle cx="30" cy="50" r="14" fill="#111827" />
      <circle cx="30" cy="50" r="10" fill="#4ade80" className="animate-ping opacity-75" />
      <circle cx="30" cy="50" r="8" fill="#22c55e" />
      
      {/* Circuit Lines on Hull */}
      <path d="M30 65 L30 95" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      
      {/* Front Eyes/Sensor (Making it look like a face/robot) */}
      <circle cx="20" cy="35" r="3" fill="#3b82f6" />
      <circle cx="40" cy="35" r="3" fill="#3b82f6" />
    </svg>
  </div>
);

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
    <div className="flex flex-col gap-8 pb-40 relative overflow-hidden bg-gray-50 min-h-screen">
      
      {/* --- TECH MAP DECORATIONS --- */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}>
      </div>
      <div className="absolute top-20 right-10 text-wit-300 pointer-events-none animate-bounce delay-700"><Wifi size={60} /></div>
      <div className="absolute top-[40%] left-5 text-wit-300 pointer-events-none animate-pulse"><Binary size={50} /></div>
      
      {/* --- HEADER --- */}
      <div className="text-center mb-4 relative z-10 pt-8 px-4">
        <div className="inline-block bg-white px-8 py-6 rounded-3xl shadow-[0_8px_0_#16a34a] border-4 border-wit-500 transform hover:scale-105 transition-transform">
            <h2 className="text-3xl md:text-5xl font-black text-wit-900 tracking-tight flex flex-col md:flex-row items-center justify-center gap-3 uppercase font-mono">
                <MapIcon className="text-wit-600 w-10 h-10 md:w-12 md:h-12" />
                Circuito WIT
            </h2>
            <p className="text-wit-700 font-bold mt-2 font-mono text-base md:text-lg bg-wit-100 px-4 py-1 rounded-full">
                Nível: Explorador de Hardware
            </p>
        </div>
      </div>

      {/* --- THE CIRCUIT MAP --- */}
      <div className="relative max-w-5xl mx-auto w-full px-4 mt-8">
        
        {/* START NODE */}
        <div className="flex justify-center mb-12 relative z-10">
            <div className="flex flex-col items-center">
                <div className="bg-wit-100 p-4 rounded-2xl border-4 border-wit-500 shadow-xl animate-bounce-slow">
                    <Server size={40} className="text-wit-700" />
                </div>
                <div className="h-8 w-4 bg-wit-300"></div> {/* Connector to line */}
                <span className="bg-wit-800 text-wit-50 text-xs font-bold px-4 py-1 rounded-full -mt-2 shadow-sm uppercase tracking-widest font-mono z-20">Início</span>
            </div>
        </div>

        {/* THE PATH (Background Line) */}
        {/* We place this absolutely, centered, to run behind everything */}
        <div className="absolute left-8 md:left-1/2 top-20 bottom-0 w-6 -translate-x-1/2 md:translate-x-0 z-0 hidden md:block">
            <div className="w-full h-full bg-wit-100 border-x-4 border-wit-300 rounded-full relative overflow-hidden">
                 {/* Moving Data Particles */}
                 <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(34,197,94,0.5),transparent)] bg-[length:100%_200px] animate-data-stream"></div>
            </div>
        </div>
        {/* Mobile Line */}
        <div className="absolute left-8 top-20 bottom-0 w-4 -translate-x-1/2 z-0 md:hidden block">
            <div className="w-full h-full bg-wit-100 border-x-2 border-wit-300 relative overflow-hidden"></div>
        </div>


        {/* DEVICES LIST */}
        <div className="flex flex-col gap-24 relative z-10">
            {sortedDevices.map((device, index) => {
                const Icon = Icons[device.icon as keyof typeof Icons] as React.ElementType;
                const isActive = activeStep === index;
                const isPast = activeStep > index;
                const isEven = index % 2 === 0;

                return (
                    // GRID LAYOUT: Left Content | Line/Node | Right Content
                    <div 
                        key={device.id} 
                        ref={el => itemRefs.current[index] = el}
                        className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_120px_1fr] items-center gap-4 md:gap-0 min-h-[180px]"
                    >
                        {/* LEFT COLUMN (Desktop Only - Even Items) */}
                        <div className="hidden md:flex justify-end pr-8">
                            {isEven && (
                                <TreasureCard 
                                    device={device} 
                                    isActive={isActive} 
                                    onClick={() => handleStep(index)}
                                    align="right"
                                />
                            )}
                        </div>

                        {/* CENTER COLUMN (Node + Boat) */}
                        <div className="relative flex flex-col items-center justify-center h-full pl-4 md:pl-0">
                             
                            {/* ROBO-BOAT (Only shows if active) */}
                            <div className={`
                                absolute z-50 pointer-events-none transition-all duration-1000 ease-in-out
                                ${isActive ? 'opacity-100 scale-100 top-[-40px]' : 'opacity-0 scale-0 top-0'}
                            `}>
                                <TopDownBoat />
                            </div>

                            {/* The Number Node */}
                            <button 
                                onClick={() => handleStep(index)}
                                className={`
                                    relative w-20 h-20 md:w-24 md:h-24 rounded-3xl rotate-45 flex items-center justify-center shadow-[0_10px_0_rgba(0,0,0,0.1)] transition-all duration-300 z-20 overflow-visible
                                    ${isActive 
                                        ? 'bg-wit-500 scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)] border-4 border-white ring-4 ring-wit-300' 
                                        : isPast 
                                            ? 'bg-wit-200 border-4 border-wit-300' 
                                            : 'bg-white border-4 border-gray-200 hover:border-wit-400 hover:scale-105'}
                                `}
                            >
                                <div className="-rotate-45 flex items-center justify-center w-full h-full">
                                    {isPast ? (
                                        <Icons.Check className="w-10 h-10 text-wit-600" strokeWidth={4} />
                                    ) : (
                                         <div className="flex flex-col items-center">
                                            {isActive ? (
                                                <Icon className="text-white w-10 h-10 animate-bounce" />
                                            ) : (
                                                <span className={`font-mono font-black text-3xl ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                    {index + 1}
                                                </span>
                                            )}
                                         </div>
                                    )}
                                </div>
                            </button>
                            
                            {/* Status Pill */}
                            {isActive && (
                                <div className="absolute -bottom-6 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border-2 border-yellow-200 z-50 animate-pulse">
                                    Local Atual
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex justify-start md:pl-8">
                             {/* Mobile: Always show card here */}
                             <div className="md:hidden w-full">
                                <TreasureCard 
                                    device={device} 
                                    isActive={isActive} 
                                    onClick={() => handleStep(index)}
                                    align="left"
                                />
                             </div>

                             {/* Desktop: Show Odd Items here */}
                            <div className="hidden md:block w-full">
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
            <div className="flex flex-col items-center justify-center relative z-20 pb-10">
                <div className="h-16 w-6 bg-wit-300 mb-[-10px]"></div>
                <div className={`
                    relative w-40 h-40 flex items-center justify-center transform transition-all duration-700 cursor-pointer group
                    ${activeStep >= sortedDevices.length - 1 ? 'scale-110' : 'scale-100 opacity-80'}
                `}>
                     {/* Vault Icon */}
                     <div className="bg-gray-800 p-8 rounded-3xl shadow-[0_15px_0_#000] border-b-8 border-gray-950 z-10 group-hover:translate-y-[-5px] transition-transform">
                        <Database size={64} className="text-wit-400 drop-shadow-md animate-pulse" />
                     </div>
                </div>
                
                <div className="mt-8 bg-wit-600 text-white font-mono font-bold px-10 py-4 rounded-2xl shadow-[0_6px_0_#14532d] uppercase tracking-widest text-xl flex items-center gap-3">
                    <ShieldCheck size={28} />
                    Missão Completa!
                </div>
            </div>
        </div>
      </div>

      {/* Navigation Controls (Floating Tech Bar) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 pr-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-4 border-wit-100 z-50 scale-90 md:scale-100">
        <button 
            onClick={() => handleStep(Math.max(0, activeStep - 1))}
            disabled={activeStep <= 0}
            className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center disabled:opacity-30 transition-colors border-4 border-gray-200 active:scale-95"
        >
            <ChevronLeft size={36} />
        </button>
        
        <div className="px-6 text-center min-w-[140px]">
            <div className="text-[11px] text-wit-600 font-bold uppercase tracking-wider mb-1 font-mono">Progresso</div>
            <div className="text-3xl font-black text-gray-800 leading-none font-mono">
                {activeStep === -1 ? '0' : activeStep + 1}<span className="text-gray-400 text-xl">/{sortedDevices.length}</span>
            </div>
        </div>

        <button 
            onClick={() => handleStep(Math.min(sortedDevices.length - 1, activeStep + 1))}
            disabled={activeStep >= sortedDevices.length - 1}
            className="w-16 h-16 rounded-full bg-wit-500 hover:bg-wit-600 text-white flex items-center justify-center disabled:opacity-30 shadow-lg transition-colors border-4 border-wit-400 active:scale-95"
        >
            <ChevronRight size={36} />
        </button>
      </div>

      <style>{`
        @keyframes data-stream {
          0% { background-position: 0 0; }
          100% { background-position: 0 200px; }
        }
        .animate-data-stream {
          animation: data-stream 2s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>

    </div>
  );
};

// Component styled like a Holographic Card
const TreasureCard = ({ device, isActive, onClick, align }: { device: any, isActive: boolean, onClick: () => void, align: 'left' | 'right' }) => {
    return (
        <div 
            onClick={onClick}
            className={`
                group relative bg-white rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 border-b-8
                ${isActive 
                    ? 'border-wit-500 shadow-[0_15px_40px_rgba(34,197,94,0.2)] scale-100 md:scale-105 -translate-y-2 z-30 ring-2 ring-wit-200' 
                    : 'border-gray-200 hover:border-wit-300 opacity-60 hover:opacity-100 hover:-translate-y-1 grayscale-[0.8] hover:grayscale-0'}
                ${align === 'right' ? 'md:text-right' : 'md:text-left'}
                text-left w-full
            `}
        >
            {/* Tech Hologram Decor */}
            <div className={`absolute top-4 ${align === 'right' ? 'left-4' : 'right-4'} text-wit-200`}>
                <Cpu size={24} className={isActive ? 'animate-spin-slow' : ''} />
            </div>

            <div className={`flex flex-col ${align === 'right' ? 'md:items-end' : 'md:items-start'}`}>
                <h3 className={`text-2xl md:text-3xl font-black mb-3 leading-tight font-sans ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                    {device.name}
                </h3>
                <p className="text-gray-600 text-lg leading-snug font-medium mb-4 font-mono">
                    {device.fullDescription}
                </p>

                {isActive && (
                    <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                        <TTSButton text={`${device.name}. ${device.fullDescription}`} label="Ouvir Dados" />
                    </div>
                )}
            </div>
        </div>
    )
}
