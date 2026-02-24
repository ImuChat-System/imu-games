import { useState } from 'react';
import { GamesHub } from './pages/GamesHub';
import { GameSlugPage } from './pages/GameSlugPage';
import { useImuChat } from './providers/ImuChatProvider';

/**
 * Simple client-side router for the Games mini-app.
 * Routes:
 *   /         → GamesHub (list of all games)
 *   /:slug    → GameSlugPage (specific game)
 */
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const { isConnected } = useImuChat();

  const navigate = (path: string) => {
    setCurrentRoute(path);
  };

  const goBack = () => {
    setCurrentRoute('/');
  };

  // Extract game slug from route
  const gameSlug = currentRoute !== '/' ? currentRoute.replace('/', '') : null;

  if (!isConnected) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (gameSlug) {
    return <GameSlugPage gameSlug={gameSlug} onBack={goBack} />;
  }

  return <GamesHub onNavigate={navigate} />;
}
