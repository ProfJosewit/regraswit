import React from 'react';
import { DEVICES } from '../data';
import { PageView } from '../types';
import { ArrowLeft, PlayCircle, Cpu } from 'lucide-react';
import { Boat } from '../components/Luna';
import { TTSButton } from '../components/TTSButton';
import * as Icons from 'lucide-react';

interface DeviceDetailProps {
  deviceId: string;
  onBack: () => void;
  onPlayGame: () => void;
}

export const DeviceDetail: React.FC<DeviceDetailProps> = ({ deviceId, onBack, onPlayGame }) => {
  const device = DEVICES.find(d => d.id === deviceId);
  
  if (!device) return <div>Dispositivo não encontrado.</div>;

  const Icon = Icons[device.icon as keyof typeof Icons] as React.ElementType;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-wit-700 font-bold mb-6 hover:underline bg-white px-4 py-2 rounded shadow-sm border border-wit-200"
      >
        <ArrowLeft size={24} /> Voltar para o Circuito
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-wit-500 mb-8 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 text-wit-800">
             <Cpu size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-wit-50 rounded-full flex items-center justify-center text-wit-600 border-4 border-wit-200 shadow-inner">
             {Icon ? <Icon size={64} /> : <Icons.Box size={64} />}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2 tracking-tight">{device.name}</h1>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Boat mood="talking" message={device.tts.intro} />
                <TTSButton text={device.tts.content} label="Ouvir Info" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-wit-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-6 bg-wit-500 rounded"></span> O que é?
            </h3>
            <p className="text-gray-600 mb-6 font-medium">{device.fullDescription}</p>
            
            <h3 className="text-xl font-bold text-wit-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-6 bg-wit-500 rounded"></span> Função
            </h3>
            <p className="text-gray-600 mb-6 font-medium">{device.usage}</p>

            <div className="bg-wit-50 p-4 rounded-lg border border-wit-200">
                <h4 className="font-bold text-wit-800 mb-1 font-mono text-sm">&gt; NO NÚCLEO WIT:</h4>
                <p className="text-wit-700 text-sm">{device.witContext}</p>
            </div>
        </div>

        {/* Activity Card */}
        <div className="flex flex-col gap-6">
            <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-3">Missão Rápida!</h3>
                <p className="text-lg font-medium text-gray-800 mb-4">{device.challenge}</p>
                <div className="text-sm text-gray-500 italic">Execute esta tarefa agora!</div>
            </div>

            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center flex-1 border-b-4 border-wit-500">
                <h3 className="text-2xl font-bold mb-4 font-mono text-wit-400">Iniciar Simulação?</h3>
                <p className="mb-6 opacity-80 text-gray-300">Teste seus conhecimentos sobre o {device.name} no Arcade.</p>
                <button 
                    onClick={onPlayGame}
                    className="bg-wit-600 text-white px-8 py-3 rounded hover:bg-wit-500 font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-wit-900/50"
                >
                    <PlayCircle /> Jogar Agora
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
