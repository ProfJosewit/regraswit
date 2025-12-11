import React from 'react';
import { PageView } from '../types';
import { Menu, X, Accessibility, Volume2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  fontSizeMult: number;
  setFontSizeMult: (n: number) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate,
  fontSizeMult,
  setFontSizeMult
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'devices', label: 'Mapa Digital' },
    { id: 'games', label: 'Arcade' },
  ];

  const baseFontSize = 16 * fontSizeMult;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50" style={{ fontSize: `${baseFontSize}px` }}>
      {/* Accessibility Bar */}
      <div className="bg-gray-900 text-gray-300 p-2 flex justify-end gap-4 text-sm px-4 md:px-8 border-b border-gray-800">
        <span className="sr-only">Acessibilidade:</span>
        <button 
          onClick={() => setFontSizeMult(1)} 
          className={`hover:text-wit-400 ${fontSizeMult === 1 ? 'font-bold text-wit-400 underline' : ''}`}
          aria-label="Tamanho de texto normal"
        >
          A
        </button>
        <button 
          onClick={() => setFontSizeMult(1.25)} 
          className={`hover:text-wit-400 ${fontSizeMult === 1.25 ? 'font-bold text-wit-400 underline' : ''}`}
          aria-label="Aumentar texto"
        >
          A+
        </button>
        <button 
          onClick={() => setFontSizeMult(1.5)} 
          className={`hover:text-wit-400 ${fontSizeMult === 1.5 ? 'font-bold text-wit-400 underline' : ''}`}
          aria-label="Texto muito grande"
        >
          A++
        </button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-wit-500">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('home')}
          >
            <div className="w-10 h-10 bg-wit-600 rounded flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-wit-700 transition-colors">W</div>
            <span className="font-bold text-gray-800 text-xl tracking-tight uppercase group-hover:text-wit-700 transition-colors">Núcleo WIT</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-bold uppercase tracking-wide transition-colors text-sm ${
                  currentPage === item.id 
                    ? 'text-wit-600 border-b-2 border-wit-500' 
                    : 'text-gray-500 hover:text-wit-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-wit-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu principal"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left font-bold py-3 px-4 rounded-lg border ${
                  currentPage === item.id ? 'bg-wit-50 border-wit-200 text-wit-700' : 'border-transparent text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 mt-10 border-t-4 border-wit-600">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2 font-bold text-wit-500 uppercase tracking-widest">Expedição Tecnológica WIT</p>
          <p>© 2024 Núcleo WIT. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
