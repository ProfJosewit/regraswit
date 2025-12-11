export interface Device {
  id: string;
  name: string;
  icon: string; // Icon name from lucide-react
  shortDescription: string;
  fullDescription: string;
  usage: string;
  witContext: string;
  challenge: string;
  imageAlt: string;
  tts: {
    intro: string;
    content: string;
  };
}

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  levels: {
    easy: LevelConfig;
    medium: LevelConfig;
    hard: LevelConfig;
  };
}

export interface LevelConfig {
  items?: number;
  complexity?: string;
  time?: number;
}

export type PageView = 'home' | 'devices' | 'device-detail' | 'games' | 'teachers' | 'game-play';

export interface AppState {
  currentPage: PageView;
  selectedDeviceId?: string;
  selectedGameId?: string;
  fontSizeMultiplier: number; // 1, 1.25, 1.5
}
