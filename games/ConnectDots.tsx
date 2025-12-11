import React, { useState, useRef, useEffect } from 'react';
import { Boat } from '../components/Luna';
import { useTTS } from '../hooks/useTTS';
import { Mic, Keyboard, Glasses, Camera, AudioLines, Hand, Eye, Image as ImageIcon } from 'lucide-react';

interface MatchItem {
  id: string;
  icon: React.ElementType;
  label: string;
  matchId: string;
}

interface ConnectDotsProps {
  level: 'easy' | 'medium' | 'hard';
  onFinish: () => void;
}

export const ConnectDots: React.FC<ConnectDotsProps> = ({ onFinish }) => {
  const { speak } = useTTS();
  
  // Left side items (Devices)
  const leftItems: MatchItem[] = [
    { id: 'alexa', icon: Mic, label: 'Alexa', matchId: 'voice' },
    { id: 'keyboard', icon: Keyboard, label: 'Teclado', matchId: 'hand' },
    { id: 'vr', icon: Glasses, label: 'Óculos VR', matchId: 'eye' },
    { id: 'camera', icon: Camera, label: 'Câmera', matchId: 'photo' },
  ];

  // Right side items (Context/Body parts) - Shuffled for gameplay
  const rightItemsInitial = [
    { id: 'hand', icon: Hand, label: 'Mão', matchId: 'keyboard' },
    { id: 'photo', icon: ImageIcon, label: 'Foto', matchId: 'camera' },
    { id: 'voice', icon: AudioLines, label: 'Voz', matchId: 'alexa' },
    { id: 'eye', icon: Eye, label: 'Olhos', matchId: 'vr' },
  ];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ left: string; right: string }[]>([]);
  const [wrongMatch, setWrongMatch] = useState<string | null>(null); 
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const rightRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [, setForceUpdate] = useState(0); 

  useEffect(() => {
    speak("Ligue o dispositivo à sua função.");
    const handleResize = () => setForceUpdate(n => n + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLeftClick = (id: string) => {
    if (matches.some(m => m.left === id)) return; 
    setSelectedLeft(id);
    setWrongMatch(null);
  };

  const handleRightClick = (id: string) => {
    if (matches.some(m => m.right === id)) return;
    
    if (selectedLeft) {
      const leftItem = leftItems.find(i => i.id === selectedLeft);
      
      if (leftItem && leftItem.matchId === id) {
        // Correct Match
        speak("Conexão estabelecida.");
        const newMatches = [...matches, { left: selectedLeft, right: id }];
        setMatches(newMatches);
        setSelectedLeft(null);

        if (newMatches.length === leftItems.length) {
          setTimeout(() => {
            speak("Excelente! Sistema operacional.");
            onFinish();
          }, 1500);
        }
      } else {
        // Wrong Match
        speak("Erro. Tente novamente.");
        setWrongMatch(id);
        setTimeout(() => setWrongMatch(null), 500);
        setSelectedLeft(null);
      }
    }
  };

  const getLineCoords = (leftId: string, rightId: string) => {
    const container = containerRef.current;
    const leftEl = leftRefs.current[leftId];
    const rightEl = rightRefs.current[rightId];

    if (!container || !leftEl || !rightEl) return null;

    const containerRect = container.getBoundingClientRect();
    const leftRect = leftEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    return {
      x1: leftRect.right - containerRect.left,
      y1: leftRect.top + leftRect.height / 2 - containerRect.top,
      x2: rightRect.left - containerRect.left,
      y2: rightRect.top + rightRect.height / 2 - containerRect.top,
    };
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Boat 
        mood={matches.length === leftItems.length ? 'happy' : 'waiting'} 
        message={matches.length === leftItems.length ? "Sistema 100% conectado!" : "Conecte os periféricos."} 
      />
      
      <div className="relative mt-8 w-full max-w-2xl bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner" ref={containerRef}>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
           {matches.map((m, i) => {
             const coords = getLineCoords(m.left, m.right);
             if (!coords) return null;
             return (
               <line 
                 key={i}
                 x1={coords.x1} y1={coords.y1}
                 x2={coords.x2} y2={coords.y2}
                 stroke="#22c55e"
                 strokeWidth="4"
                 strokeLinecap="round"
                 className="animate-draw"
                 strokeDasharray="10 5"
               />
             );
           })}
        </svg>

        <div className="flex justify-between items-center gap-8 relative z-20">
          
          <div className="flex flex-col gap-6 w-1/3">
            {leftItems.map((item) => {
              const isMatched = matches.some(m => m.left === item.id);
              const isSelected = selectedLeft === item.id;
              
              return (
                <button
                  key={item.id}
                  ref={el => leftRefs.current[item.id] = el}
                  onClick={() => handleLeftClick(item.id)}
                  disabled={isMatched}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg shadow-sm border-2 transition-all h-32
                    ${isMatched 
                      ? 'bg-wit-50 border-wit-500 text-wit-700 opacity-80' 
                      : isSelected 
                        ? 'bg-white border-yellow-400 scale-105 shadow-md' 
                        : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50'}
                  `}
                >
                  <item.icon size={36} className="mb-2" />
                  <span className="font-bold text-sm md:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 w-1/3">
            {rightItemsInitial.map((item) => {
              const isMatched = matches.some(m => m.right === item.id);
              const isWrong = wrongMatch === item.id;

              return (
                <button
                  key={item.id}
                  ref={el => rightRefs.current[item.id] = el}
                  onClick={() => handleRightClick(item.id)}
                  disabled={isMatched}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg shadow-sm border-2 transition-all h-32
                    ${isMatched 
                      ? 'bg-wit-50 border-wit-500 text-wit-700 opacity-80' 
                      : isWrong
                        ? 'bg-red-50 border-red-400 animate-shake'
                        : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50'}
                  `}
                >
                  <item.icon size={36} className="mb-2" />
                  <span className="font-bold text-sm md:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
