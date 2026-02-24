import { BrainCircuit, Puzzle, Swords, Users } from 'lucide-react';
import { useState } from 'react';
import { CallToAction } from '../components/hub/CallToAction';
import { CategoryFilterBar } from '../components/hub/CategoryFilterBar';
import { FeaturedCarousel } from '../components/hub/FeaturedCarousel';
import { GameCard } from '../components/hub/GameCard';
import { useTranslations } from '../providers/I18nProvider';

interface GamesHubProps {
  onNavigate: (path: string) => void;
}

export function GamesHub({ onNavigate }: GamesHubProps) {
  const t = useTranslations('GamesHub');
  const tDetails = useTranslations('GamesHub.gameDetails');
  const [activeCategory, setActiveCategory] = useState('all');

  const ALL_GAMES = [
    {
      id: 'quiz',
      name: tDetails('animeQuiz.name'),
      description: tDetails('animeQuiz.description'),
      slug: 'quiz',
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      cta: tDetails('animeQuiz.cta'),
      disabled: false,
      category: 'quiz',
      tags: tDetails('animeQuiz.tags').split(', '),
      backgroundImage: 'https://placehold.co/600x400.png',
    },
    {
      id: 'duel',
      name: tDetails('characterDuel.name'),
      description: tDetails('characterDuel.description'),
      slug: 'duel',
      icon: <Swords className="h-10 w-10 text-primary" />,
      cta: tDetails('characterDuel.cta'),
      disabled: true,
      category: 'strategy',
      tags: tDetails('characterDuel.tags').split(', '),
      backgroundImage: 'https://placehold.co/600x400.png',
    },
    {
      id: 'puzzle',
      name: tDetails('genshinPuzzle.name'),
      description: tDetails('genshinPuzzle.description'),
      slug: 'puzzle',
      icon: <Puzzle className="h-10 w-10 text-primary" />,
      cta: tDetails('genshinPuzzle.cta'),
      disabled: true,
      category: 'puzzle',
      tags: tDetails('genshinPuzzle.tags').split(', '),
      backgroundImage: 'https://placehold.co/600x400.png',
    },
    {
      id: 'draw',
      name: tDetails('communityDraw.name'),
      description: tDetails('communityDraw.description'),
      slug: 'draw',
      icon: <Users className="h-10 w-10 text-primary" />,
      cta: tDetails('communityDraw.cta'),
      disabled: true,
      category: 'community',
      tags: tDetails('communityDraw.tags').split(', '),
      backgroundImage: 'https://placehold.co/600x400.png',
    },
  ];

  const filteredGames =
    activeCategory === 'all'
      ? ALL_GAMES
      : ALL_GAMES.filter((game) => game.category === activeCategory);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <p className="text-muted-foreground">{t('description')}</p>

      <FeaturedCarousel />

      <CategoryFilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => !game.disabled && onNavigate(game.slug)}
          />
        ))}
      </div>

      <CallToAction />
    </div>
  );
}
