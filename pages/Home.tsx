import React from 'react';
import { Boat } from '../components/Luna';
import { PageView } from '../types';
import { Map, Gamepad2, Cpu, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-12 animate-fade-in">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-wit-50 p-8 rounded-3xl shadow-lg border-2 border-wit-200 relative overflow-hidden">
        {/* Decorative Circuit Lines */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #22c55e 1px, transparent 1px), linear-gradient(180deg, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-wit-500 opacity-50"></div>
        
        <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-wit-900 leading-tight font-sans">
            Bem-vindo à <br/><span className="text-wit-600">Expedição Tecnológica</span>
          </h1>
          <p className="text-xl text-wit-800/80 font-medium font-mono">
            Conecte-se! Vamos navegar pelo circuito do conhecimento!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onNavigate('devices')}
              className="px-8 py-4 bg-wit-600 text-white font-bold rounded-lg hover:bg-wit-700 shadow-[0_4px_0_#15803d] hover:shadow-[0_2px_0_#15803d] transform hover:translate-y-[2px] transition-all text-lg flex items-center justify-center gap-2"
            >
              <Map size={24} /> Abrir Mapa Digital
            </button>
            <button 
              onClick={() => onNavigate('games')}
              className="px-8 py-4 bg-white text-wit-600 border-2 border-wit-500 font-bold rounded-lg hover:bg-wit-50 shadow-[0_4px_0_#dcfce7] hover:shadow-[0_2px_0_#dcfce7] transform hover:translate-y-[2px] transition-all text-lg flex items-center justify-center gap-2"
            >
              <Gamepad2 size={24} /> Acessar Games
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative z-10 mt-10 md:mt-0">
            <Boat mood="happy" message="Sistema online! Sou o Robo-Barco." />
        </div>
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        <div 
          onClick={() => onNavigate('devices')}
          className="cursor-pointer group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border-l-8 border-wit-400 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Tech Pattern BG */}
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu size={100} />
          </div>

          <div className="w-16 h-16 bg-wit-100 text-wit-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform rotate-3 group-hover:rotate-0">
            <Cpu size={32} />
          </div>
          <h3 className="text-2xl font-black text-wit-900 mb-3">Mapa de Circuitos</h3>
          <p className="text-gray-600 mb-4 font-medium">Siga a trilha de dados e descubra como a tecnologia funciona!</p>
        </div>

        <div 
           onClick={() => onNavigate('games')}
           className="cursor-pointer group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border-l-8 border-orange-400 flex flex-col items-center text-center relative overflow-hidden"
        >
           {/* Tech Pattern BG */}
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gamepad2 size={100} />
          </div>

          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform -rotate-3 group-hover:rotate-0">
            <Zap size={32} />
          </div>
          <h3 className="text-2xl font-black text-orange-900 mb-3">Arcade Digital</h3>
          <p className="text-gray-600 mb-4 font-medium">Desafios de lógica, memória e quizzes para testar seu sistema.</p>
        </div>
      </div>
    </div>
  );
};
