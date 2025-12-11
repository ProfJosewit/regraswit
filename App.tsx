import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Devices } from './pages/Devices';
import { DeviceDetail } from './pages/DeviceDetail';
import { Games } from './pages/Games';
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [fontSizeMult, setFontSizeMult] = useState(1);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectDevice = (id: string) => {
    setSelectedDeviceId(id);
    handleNavigate('device-detail');
  };

  const handleGoToGame = () => {
    handleNavigate('games');
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={handleNavigate}
      fontSizeMult={fontSizeMult}
      setFontSizeMult={setFontSizeMult}
    >
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      
      {currentPage === 'devices' && <Devices onSelectDevice={handleSelectDevice} />}
      
      {currentPage === 'device-detail' && selectedDeviceId && (
        <DeviceDetail 
          deviceId={selectedDeviceId} 
          onBack={() => handleNavigate('devices')} 
          onPlayGame={handleGoToGame}
        />
      )}
      
      {currentPage === 'games' && <Games onBack={() => handleNavigate('home')} />}
    </Layout>
  );
}

export default App;
