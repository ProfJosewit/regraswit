import React, { useState, useEffect } from 'react';
import { Boat } from '../components/Luna';
import { DEVICES } from '../data';
import { useTTS } from '../hooks/useTTS';

interface WordSearchProps {
  onFinish: () => void;
}

interface Cell {
  x: number;
  y: number;
  char: string;
  selected: boolean;
  found: boolean;
}

export const WordSearch: React.FC<WordSearchProps> = ({ onFinish }) => {
  const { speak } = useTTS();
  const GRID_SIZE = 10;
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{x: number, y: number} | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{x: number, y: number} | null>(null);

  // Initialize Game
  useEffect(() => {
    const selectedDevices = DEVICES
        .filter(d => d.name.length <= 8 && d.name.indexOf(' ') === -1) 
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(d => d.name.toUpperCase());

    setWordsToFind(selectedDevices);
    setFoundWords([]);
    speak("Encontre as palavras escondidas na grade.");

    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map((_, y) => 
        Array(GRID_SIZE).fill(null).map((_, x) => ({
            x, y, char: '', selected: false, found: false
        }))
    );

    selectedDevices.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            const direction = Math.random() > 0.5 ? 'H' : 'V';
            const startX = Math.floor(Math.random() * (direction === 'H' ? GRID_SIZE - word.length : GRID_SIZE));
            const startY = Math.floor(Math.random() * (direction === 'V' ? GRID_SIZE - word.length : GRID_SIZE));

            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
                const cx = direction === 'H' ? startX + i : startX;
                const cy = direction === 'V' ? startY + i : startY;
                if (newGrid[cy][cx].char !== '' && newGrid[cy][cx].char !== word[i]) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    const cx = direction === 'H' ? startX + i : startX;
                    const cy = direction === 'V' ? startY + i : startY;
                    newGrid[cy][cx].char = word[i];
                }
                placed = true;
            }
            attempts++;
        }
    });

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (newGrid[y][x].char === '') {
                newGrid[y][x].char = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    setGrid(newGrid);
  }, []);

  const getSelectedCells = (start: {x: number, y: number}, end: {x: number, y: number}) => {
      const cells: {x: number, y: number}[] = [];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
          const x1 = Math.min(start.x, end.x);
          const x2 = Math.max(start.x, end.x);
          for(let i = x1; i <= x2; i++) cells.push({x: i, y: start.y});
      } else {
          const y1 = Math.min(start.y, end.y);
          const y2 = Math.max(start.y, end.y);
          for(let i = y1; i <= y2; i++) cells.push({x: start.x, y: i});
      }
      return cells;
  };

  const handleMouseDown = (x: number, y: number) => {
      setIsSelecting(true);
      setSelectionStart({x, y});
      setSelectionEnd({x, y});
  };

  const handleMouseEnter = (x: number, y: number) => {
      if (isSelecting) {
          setSelectionEnd({x, y});
      }
  };

  const handleMouseUp = () => {
      if (!isSelecting || !selectionStart || !selectionEnd) return;
      setIsSelecting(false);

      const selectedCoords = getSelectedCells(selectionStart, selectionEnd);
      const selectedWord = selectedCoords.map(c => grid[c.y][c.x].char).join('');
      const reverseWord = selectedWord.split('').reverse().join('');

      const checkWord = (word: string) => {
          if (wordsToFind.includes(word) && !foundWords.includes(word)) {
              const newGrid = [...grid];
              selectedCoords.forEach(c => newGrid[c.y][c.x].found = true);
              setGrid(newGrid);
              speak(`Palavra encontrada: ${word}`);
              setFoundWords(prev => {
                  const updated = [...prev, word];
                  if (updated.length === wordsToFind.length) {
                      setTimeout(() => {
                          speak("Parabéns! Você encontrou todas as palavras.");
                          onFinish();
                      }, 1000);
                  }
                  return updated;
              });
              return true;
          }
          return false;
      };

      if (!checkWord(selectedWord)) {
          checkWord(reverseWord);
      }

      setSelectionStart(null);
      setSelectionEnd(null);
  };

  const isCellSelected = (x: number, y: number) => {
      if (!isSelecting || !selectionStart || !selectionEnd) return false;
      const coords = getSelectedCells(selectionStart, selectionEnd);
      return coords.some(c => c.x === x && c.y === y);
  };

  return (
    <div className="flex flex-col items-center">
      <Boat mood={foundWords.length > 0 ? 'happy' : 'waiting'} message={`Buscando: ${wordsToFind.filter(w => !foundWords.includes(w)).join(', ')}`} />
      
      <div className="mt-6 flex flex-col items-center gap-4">
          <div 
            className="grid gap-1 bg-gray-200 p-2 rounded shadow-inner select-none touch-none border-2 border-gray-300"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            onMouseLeave={handleMouseUp}
          >
              {grid.map((row, y) => (
                  row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`
                            w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-lg md:text-xl rounded cursor-pointer font-mono
                            ${cell.found ? 'bg-wit-500 text-white animate-pulse' : 
                              isCellSelected(x, y) ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-gray-700 hover:bg-gray-100'}
                        `}
                        onMouseDown={() => handleMouseDown(x, y)}
                        onMouseEnter={() => handleMouseEnter(x, y)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => { e.preventDefault(); handleMouseDown(x, y); }}
                        onTouchEnd={handleMouseUp}
                      >
                          {cell.char}
                      </div>
                  ))
              ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
              {wordsToFind.map(word => (
                  <span key={word} className={`px-3 py-1 rounded-full text-sm font-bold border font-mono ${foundWords.includes(word) ? 'bg-wit-600 text-white border-wit-600 line-through decoration-2' : 'bg-white text-gray-500 border-gray-200'}`}>
                      {word}
                  </span>
              ))}
          </div>
      </div>
    </div>
  );
};