import React, { useState } from 'react';
import { Boat } from '../components/Luna';
import { MemoryGame } from '../games/Memory';
import { ConnectDots } from '../games/ConnectDots';
import { WordSearch } from '../games/WordSearch';
import { QuizGame } from '../games/Quiz';
import { ArrowLeft, Star, Link, Brain, Grid3X3, HelpCircle } from 'lucide-react';

interface GamesProps {
    onBack: () => void;
}

export const Games: React.FC<GamesProps> = ({ onBack }) => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'menu'|'playing'|'finished'>('menu');

  const handleStartLevel = (level: number) => {
    setActiveLevel(level);
    setGameState('playing');
  };

  const handleFinish = () => {
    setGameState('finished');
  };

  const handleReset = () => {
    setGameState('menu');
    setActiveLevel(null);
  };

  if (gameState === 'playing' && activeLevel) {
    return (
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="w-full flex justify-between items-center mb-6">
            <button onClick={handleReset} className="flex items-center gap-2 text-wit-700 hover:text-wit-900 font-bold bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
                <ArrowLeft /> Sair do Jogo
            </button>
            <div className="flex gap-2">
                <span className="px-4 py-2 rounded bg-wit-600 text-white shadow-md font-mono text-sm">
                    Nível {activeLevel}
                </span>
            </div>
        </div>

        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg w-full min-h-[400px] border-t-4 border-wit-500">
            {activeLevel === 1 && <ConnectDots level="easy" onFinish={handleFinish} />}
            {activeLevel === 2 && <MemoryGame level="medium" onFinish={handleFinish} />}
            {activeLevel === 3 && <WordSearch onFinish={handleFinish} />}
            {activeLevel === 4 && <QuizGame level="medium" onFinish={handleFinish} />}
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-bounce-in">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg mb-6 animate-bounce border-4 border-yellow-200">
                <Star size={48} fill="white" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-4">Conhecimento Adquirido!</h2>
            <Boat mood="happy" message={`Upload de Nível ${activeLevel} completo!`} />
            
            <div className="flex gap-4 mt-8">
                <button onClick={handleReset} className="bg-wit-600 text-white px-8 py-3 rounded hover:bg-wit-700 font-bold shadow-md transform hover:-translate-y-1 transition-all">
                    Novo Desafio
                </button>
            </div>
        </div>
    )
  }

  // Menu View
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-wit-900 font-mono">Arcade Digital</h2>
        <p className="text-gray-600">Complete os 4 módulos para dominar o sistema!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {/* Level 1 */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all border-b-4 border-green-500 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1" onClick={() => handleStartLevel(1)}>
            <div className="w-16 h-16 bg-green-50 rounded flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                <Link size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Módulo 1</h3>
            <p className="text-gray-500 mb-4 text-sm font-mono">Conectar Hardware</p>
            <div className="w-full bg-green-500 h-1 rounded mb-4 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <button className="text-green-600 font-bold text-sm uppercase">Iniciar</button>
        </div>

        {/* Level 2 */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all border-b-4 border-blue-500 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1" onClick={() => handleStartLevel(2)}>
            <div className="w-16 h-16 bg-blue-50 rounded flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Brain size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Módulo 2</h3>
            <p className="text-gray-500 mb-4 text-sm font-mono">Memória RAM</p>
            <div className="w-full bg-blue-500 h-1 rounded mb-4 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <button className="text-blue-600 font-bold text-sm uppercase">Iniciar</button>
        </div>

        {/* Level 3 */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all border-b-4 border-purple-500 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1" onClick={() => handleStartLevel(3)}>
            <div className="w-16 h-16 bg-purple-50 rounded flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                <Grid3X3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Módulo 3</h3>
            <p className="text-gray-500 mb-4 text-sm font-mono">Caça-Dados</p>
            <div className="w-full bg-purple-500 h-1 rounded mb-4 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <button className="text-purple-600 font-bold text-sm uppercase">Iniciar</button>
        </div>

        {/* Level 4 */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all border-b-4 border-orange-500 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1" onClick={() => handleStartLevel(4)}>
            <div className="w-16 h-16 bg-orange-50 rounded flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                <HelpCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Módulo 4</h3>
            <p className="text-gray-500 mb-4 text-sm font-mono">Quiz do Sistema</p>
            <div className="w-full bg-orange-500 h-1 rounded mb-4 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <button className="text-orange-600 font-bold text-sm uppercase">Iniciar</button>
        </div>

      </div>
      
      <div className="flex justify-center mt-8">
          <Boat mood="happy" message="Selecione um módulo, humano!" />
      </div>
    </div>
  );
};
