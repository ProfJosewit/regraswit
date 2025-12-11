import React, { useState, useEffect } from 'react';
import { DEVICES } from '../data';
import * as Icons from 'lucide-react';
import { Boat } from '../components/Luna';
import { useTTS } from '../hooks/useTTS';

interface MemoryProps {
  level: 'easy' | 'medium' | 'hard';
  onFinish: () => void;
}

export const MemoryGame: React.FC<MemoryProps> = ({ level, onFinish }) => {
  const { speak } = useTTS();
  const [cards, setCards] = useState<{ id: number; deviceId: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  // Setup game
  useEffect(() => {
    let pairCount = 6;
    if (level === 'medium') pairCount = 8;
    if (level === 'hard') pairCount = 12;

    const selectedDevices = [...DEVICES].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    
    const deck = [...selectedDevices, ...selectedDevices].map((d, i) => ({
      id: i,
      deviceId: d.id,
      flipped: false,
      matched: false
    }));

    setCards(deck.sort(() => 0.5 - Math.random()));
    setMatches(0);
    setMoves(0);
    speak("Encontre os pares das cartas.");
  }, [level]);

  const handleCardClick = (index: number) => {
    if (cards[index].matched || cards[index].flipped || flippedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (newCards[first].deviceId === newCards[second].deviceId) {
        // Match found
        speak("Par perfeito!");
        setTimeout(() => {
          newCards[first].matched = true;
          newCards[second].matched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setMatches(m => m + 1);

          if (matches + 1 === cards.length / 2) {
            speak("Incrível! Você venceu.");
            onFinish();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Boat mood="happy" message={`Processando memória... Jogadas: ${moves}`} />
      
      <div className={`grid gap-4 ${level === 'hard' ? 'grid-cols-4 md:grid-cols-6' : 'grid-cols-3 md:grid-cols-4'}`}>
        {cards.map((card, index) => {
          const device = DEVICES.find(d => d.id === card.deviceId);
          const Icon = device ? (Icons[device.icon as keyof typeof Icons] as React.ElementType) : Icons.Box;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.flipped || card.matched}
              className={`
                w-20 h-20 md:w-24 md:h-24 rounded shadow-sm flex items-center justify-center transition-all duration-300 transform border-2
                ${card.flipped || card.matched 
                    ? 'bg-white rotate-0 border-wit-300' 
                    : 'bg-wit-500 rotate-y-180 hover:bg-wit-600 border-wit-600'}
              `}
              aria-label={card.flipped || card.matched ? `Carta virada: ${device?.name}` : "Carta virada para baixo"}
            >
              {(card.flipped || card.matched) ? (
                <div className="text-center animate-fade-in">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-wit-600 mx-auto" />
                </div>
              ) : (
                <span className="text-wit-200 font-bold text-2xl font-mono">?</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
