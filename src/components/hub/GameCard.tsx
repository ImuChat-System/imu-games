import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface GameCardProps {
  game: {
    name: string;
    description: string;
    icon: ReactNode;
    cta: string;
    disabled: boolean;
    tags: string[];
    backgroundImage: string;
  };
  onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-lg cursor-pointer">
        <CardHeader className="p-0 relative h-32">
          <img
            src={game.backgroundImage}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
          <div className="absolute bottom-4 left-4 text-white flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              {game.icon}
            </div>
            <div>
              <CardTitle className="text-xl text-white drop-shadow-md">
                {game.name}
              </CardTitle>
              <div className="flex gap-1 mt-1">
                {game.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-6">
          <CardDescription>{game.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={game.disabled}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {game.cta}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
