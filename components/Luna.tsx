import React, { useEffect, useState } from 'react';
import { Bot, Wifi } from 'lucide-react';

interface BoatProps {
  mood?: 'happy' | 'talking' | 'waiting';
  message?: string;
  onClick?: () => void;
}

// O Robo-Barco WIT - Futuristic Guide
export const Boat: React.FC<BoatProps> = ({ mood = 'happy', message, onClick }) => {
  const [float, setFloat] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Floating animation
    const floatInterval = setInterval(() => {
        setFloat(prev => !prev);
    }, 2000);

    // Blinking lights
    const blinkInterval = setInterval(() => {
        setBlink(prev => !prev);
    }, 800);

    return () => {
        clearInterval(floatInterval);
        clearInterval(blinkInterval);
    };
  }, []);

  const handleInteraction = () => {
    if (onClick) onClick();

    // Robot Sound Effect
    const utterance = new SpeechSynthesisUtterance("Bip bop! Sistema WIT pronto para aprender.");
    utterance.lang = 'pt-BR';
    utterance.pitch = 1.2; // Robot-like pitch
    utterance.rate = 1.1; 
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center group cursor-pointer z-10 select-none relative" onClick={handleInteraction}>
      
      {/* Tech Speech Bubble */}
      {message && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-24 bg-white border-2 border-wit-400 rounded-xl p-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] w-[220px] animate-fade-in-up z-50">
           {/* Digital connector */}
           <div className="absolute bottom-[-8px] left-1/2 md:left-2 -translate-x-1/2 md:translate-x-0 w-4 h-4 bg-white border-b-2 border-r-2 border-wit-400 rotate-45"></div>
           
           <p className="text-center font-bold text-wit-800 text-sm leading-tight relative z-10 font-mono">
             <span className="text-wit-500 mr-2">&gt;_</span>
             {message}
           </p>
        </div>
      )}

      {/* ROBO-BOAT CONTAINER */}
      <div className={`relative w-44 h-36 transition-transform duration-[2000ms] ease-in-out ${float ? '-translate-y-2' : 'translate-y-2'}`}>
        
        {/* Antenna / Radar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gray-400 z-0"></div>
        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-0 transition-colors duration-300 ${blink ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-red-900'}`}></div>
        <div className="absolute top-4 left-1/2 ml-2 text-wit-400 opacity-60">
            <Wifi size={24} className="animate-pulse" />
        </div>

        {/* Holographic Sail */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-20 bg-wit-100/50 border-2 border-wit-400 rounded-t-full backdrop-blur-sm z-10 overflow-hidden">
             {/* Digital Lines */}
             <div className="w-full h-full relative opacity-30">
                 <div className="absolute top-2 w-full h-[1px] bg-wit-400"></div>
                 <div className="absolute top-6 w-full h-[1px] bg-wit-400"></div>
                 <div className="absolute top-10 w-full h-[1px] bg-wit-400"></div>
                 <div className="absolute top-14 w-full h-[1px] bg-wit-400"></div>
             </div>
             {/* Logo */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <Bot size={32} className="text-wit-600" />
             </div>
        </div>

        {/* Metallic Hull */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-14 bg-gradient-to-b from-gray-100 to-gray-300 rounded-b-3xl rounded-t-lg z-20 shadow-lg border-2 border-gray-400 flex flex-col items-center justify-center">
             
             {/* Glowing Strip */}
             <div className="w-full h-3 bg-gray-800 mt-2 flex items-center justify-center gap-4 px-4 overflow-hidden">
                 <div className="w-full h-1 bg-wit-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
             </div>

             {/* Text */}
             <div className="text-[10px] font-black text-gray-500 mt-1 tracking-widest uppercase">WIT-BOT 3000</div>
             
             {/* Propulsion glow underneath */}
             <div className="absolute -bottom-2 w-24 h-4 bg-wit-400/50 blur-lg rounded-full animate-pulse"></div>
        </div>

      </div>

      {/* Digital Water/Grid Waves */}
      <div className="flex gap-2 mt-[-20px] z-30 opacity-60">
          <div className="w-12 h-1 bg-wit-400 animate-pulse delay-75"></div>
          <div className="w-16 h-1 bg-wit-500 animate-pulse delay-150"></div>
          <div className="w-8 h-1 bg-wit-300 animate-pulse delay-300"></div>
      </div>
      
    </div>
  );
};
