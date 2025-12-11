import React, { useState, useEffect } from 'react';
import { DEVICES } from '../data';
import * as Icons from 'lucide-react';
import { Boat } from '../components/Luna';
import { TTSButton } from '../components/TTSButton';

interface QuizProps {
  level: 'easy' | 'medium' | 'hard';
  onFinish: () => void;
}

export const QuizGame: React.FC<QuizProps> = ({ level, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Generate questions
    const q = DEVICES.sort(() => 0.5 - Math.random()).slice(0, 5).map(target => {
      // Get 2 distractors
      const distractors = DEVICES
        .filter(d => d.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      
      const options = [target, ...distractors].sort(() => 0.5 - Math.random());
      
      let questionText = target.shortDescription;
      if (level === 'medium') questionText = target.usage;
      if (level === 'hard') questionText = target.challenge; // Harder clue

      return {
        target,
        options,
        text: questionText
      };
    });
    setQuestions(q);
    setCurrentQuestion(0);
    setScore(0);
  }, [level]);

  const handleAnswer = (deviceId: string) => {
    if (feedback) return; // Wait for next question

    const isCorrect = deviceId === questions[currentQuestion].target.id;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback("Resposta Correta!");
      // Play sound effect logic here if needed
    } else {
      setFeedback(`Erro. A resposta era: ${questions[currentQuestion].target.name}.`);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        onFinish();
      }
    }, 2000);
  };

  if (questions.length === 0) return <div>Carregando...</div>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded border border-gray-300">
        <Boat mood="talking" message={feedback || `Processando questão ${currentQuestion + 1}/${questions.length}...`} />
        <div className="text-xl font-bold text-wit-700 font-mono">Score: {score}</div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow border-2 border-wit-100 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 font-mono">Identifique o Componente:</h3>
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
             <p className="text-xl text-gray-700 font-medium min-h-[3rem]">"{currentQ.text}"</p>
        </div>
        
        <div className="flex justify-center mb-6">
           <TTSButton text={currentQ.text} label="Ouvir Dados" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentQ.options.map((opt: any) => {
             const Icon = Icons[opt.icon as keyof typeof Icons] as React.ElementType;
             return (
               <button
                 key={opt.id}
                 onClick={() => handleAnswer(opt.id)}
                 className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded hover:border-wit-500 hover:bg-wit-50 transition-all group"
               >
                 <Icon className="w-12 h-12 text-gray-400 group-hover:text-wit-600" />
                 <span className="font-bold text-gray-700">{opt.name}</span>
               </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};
