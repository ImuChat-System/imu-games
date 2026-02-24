import { AnimatePresence, motion } from 'framer-motion';
import { Award, Shield, Sparkles, Trophy } from 'lucide-react';
import { useTranslations } from '../../providers/I18nProvider';
import { Avatar } from '../ui/Avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

interface ScoreBoardProps {
  players: { userId: string; name: string; score: number; avatar: string }[];
  currentUserId: string;
}

export function ScoreBoard({ players, currentUserId }: ScoreBoardProps) {
  const t = useTranslations('QuizGame');
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Trophy className="h-6 w-6 text-yellow-400" />;
    if (rank === 1) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 2) return <Shield className="h-5 w-5 text-yellow-700" />;
    return <span className="w-6 text-center text-lg font-bold">{rank + 1}</span>;
  };

  return (
    <Card className="h-full w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          {t('scoreboardTitle')}
        </CardTitle>
        <CardDescription>{t('scoreboardDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <AnimatePresence>
            {sortedPlayers.map((player, index) => (
              <motion.li
                key={player.userId}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`flex items-center gap-4 p-2 rounded-lg transition-colors ${
                  player.userId === currentUserId
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-card'
                }`}
              >
                <div className="w-8 text-center font-bold flex items-center justify-center">
                  {getRankIcon(index)}
                </div>
                <Avatar
                  src={player.avatar}
                  alt={player.name}
                  fallback={player.name.charAt(0)}
                />
                <span className="flex-grow font-semibold truncate">
                  {player.userId === currentUserId
                    ? `${player.name} ${t('you')}`
                    : player.name}
                </span>
                <div className="relative">
                  <span className="font-mono font-bold text-primary text-lg">
                    {player.score}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </CardContent>
    </Card>
  );
}
