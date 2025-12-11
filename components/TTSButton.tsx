import React from 'react';
import { Volume2, StopCircle, Loader2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

interface TTSButtonProps {
  text: string;
  label?: string;
}

export const TTSButton: React.FC<TTSButtonProps> = ({ text, label = "Ouvir" }) => {
  const { speak, isPlaying, isLoading } = useTTS();

  return (
    <button
      onClick={() => speak(text)}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all
        ${isPlaying 
          ? 'bg-red-100 text-red-600 ring-2 ring-red-400' 
          : 'bg-wit-100 text-wit-700 hover:bg-wit-200 ring-2 ring-wit-300'}
        ${isLoading ? 'opacity-70 cursor-wait' : ''}
      `}
      aria-label={isPlaying ? "Parar leitura" : "Ouvir texto"}
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : isPlaying ? (
        <StopCircle size={20} />
      ) : (
        <Volume2 size={20} />
      )}
      {isLoading ? "Carregando..." : isPlaying ? "Parar" : label}
    </button>
  );
};