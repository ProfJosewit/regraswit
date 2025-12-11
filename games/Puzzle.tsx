import React, { useState, useEffect } from 'react';
import { Boat } from '../components/Luna';

interface PuzzleProps {
  level: 'easy' | 'medium' | 'hard';
  onFinish: () => void;
}

export const PuzzleGame: React.FC<PuzzleProps> = ({ level, onFinish }) => {
  const [gridSize, setGridSize] = useState(2);
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);

  useEffect(() => {
    let size = 2; // 2x2
    if (level === 'medium') size = 3;
    if (level === 'hard') size = 4;
    setGridSize(size);

    // Create shuffled array [0, 1, 2, ... size*size-1]
    const arr = Array.from({ length: size * size }, (_, i) => i);
    
    // Shuffle ensuring it's not solved initially
    let shuffled = [...arr];
    do {
        shuffled = shuffled.sort(() => 0.5 - Math.random());
    } while (shuffled.every((val, index) => val === index));

    setTiles(shuffled);
  }, [level]);

  const handleTileClick = (index: number) => {
    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else {
      // Swap
      const newTiles = [...tiles];
      const temp = newTiles[index];
      newTiles[index] = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = temp;
      
      setTiles(newTiles);
      setSelectedTileIndex(null);

      // Check win
      if (newTiles.every((val, idx) => val === idx)) {
        setTimeout(onFinish, 500);
      }
    }
  };

  const imageUrl = "https://picsum.photos/400/400"; // Placeholder image

  return (
    <div className="flex flex-col items-center">
      <Boat mood="happy" message={selectedTileIndex !== null ? "Onde essa peça vai?" : "Clique em duas peças para trocar de lugar!"} />
      
      <div 
        className="mt-6 grid gap-1 bg-gray-300 p-1 rounded-lg"
        style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '400px',
            maxWidth: '90vw',
            aspectRatio: '1/1'
        }}
      >
        {tiles.map((tileNumber, index) => {
          // Calculate background position for this specific tile number
          const x = (tileNumber % gridSize) * (100 / (gridSize - 1));
          const y = (Math.floor(tileNumber / gridSize)) * (100 / (gridSize - 1));

          return (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`
                relative cursor-pointer overflow-hidden transition-all duration-200
                ${selectedTileIndex === index ? 'ring-4 ring-yellow-400 z-10 scale-105' : 'hover:opacity-90'}
              `}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${x}% ${y}%`,
                backgroundColor: '#eee'
              }}
            >
                {/* Optional: Show numbers for easier debugging/playing for kids */}
                <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 rounded">{tileNumber + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
