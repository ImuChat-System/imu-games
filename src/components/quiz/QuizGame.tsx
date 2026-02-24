import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useTranslations } from '../../providers/I18nProvider';
import { useImuChat } from '../../providers/ImuChatProvider';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { QuizQuestion } from './QuizQuestion';
import { QuizTimer } from './QuizTimer';
import { ScoreBoard } from './ScoreBoard';

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    text: "In 'Attack on Titan', which branch of the military is responsible for exploring outside the Walls?",
    choices: [
      { id: 'c1', label: 'The Survey Corps' },
      { id: 'c2', label: 'The Garrison' },
      { id: 'c3', label: 'The Military Police' },
      { id: 'c4', label: 'The Royal Guard' },
    ],
    correctChoiceId: 'c1',
  },
  {
    id: 'q2',
    text: "What is the name of the spirit companion of Yugi Muto in 'Yu-Gi-Oh!'?",
    choices: [
      { id: 'c1', label: 'Seto Kaiba' },
      { id: 'c2', label: 'Atem' },
      { id: 'c3', label: 'Marik Ishtar' },
      { id: 'c4', label: 'Maximillion Pegasus' },
    ],
    correctChoiceId: 'c2',
  },
  {
    id: 'q3',
    text: "In 'Naruto', what is the signature jutsu of the Uchiha clan?",
    choices: [
      { id: 'c1', label: 'Rasengan' },
      { id: 'c2', label: 'Shadow Clone Jutsu' },
      { id: 'c3', label: 'Fireball Jutsu' },
      { id: 'c4', label: 'Chidori' },
    ],
    correctChoiceId: 'c3',
  },
];

const MOCK_PLAYERS = [
  { userId: 'user1', name: 'Kaito', score: 0, avatar: 'https://placehold.co/40x40.png' },
  { userId: 'user2', name: 'Yuki', score: 0, avatar: 'https://placehold.co/40x40.png' },
  { userId: 'user-self', name: 'Haru', score: 0, avatar: 'https://placehold.co/40x40.png' },
];

export function QuizGame() {
  const t = useTranslations('QuizGame');
  const { user } = useImuChat();
  const currentUserId = user?.id || 'user-self';

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState(MOCK_PLAYERS);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

  const handleNextQuestion = useCallback(() => {
    setIsAnswered(false);
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState('ended');
    }
  }, [currentQuestionIndex]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (isCorrect) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) =>
          p.userId === currentUserId ? { ...p, score: p.score + 100 } : p,
        ),
      );
    }

    // Auto-advance after delay
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleTimeout = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  }, [isAnswered, handleNextQuestion]);

  const startGame = () => {
    setCurrentQuestionIndex(0);
    setPlayers(MOCK_PLAYERS.map((p) => ({ ...p, score: 0 })));
    setIsAnswered(false);
    setGameState('playing');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full max-w-6xl">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            {gameState === 'playing' && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('title')}</CardTitle>
                  <QuizTimer
                    key={currentQuestion.id}
                    duration={15}
                    onTimeout={handleTimeout}
                    isPaused={isAnswered}
                  />
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <QuizQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    disabled={isAnswered}
                  />
                </CardContent>
              </motion.div>
            )}
            {gameState === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="m-auto text-center p-8"
              >
                <CardTitle>{t('readyTitle')}</CardTitle>
                <Button onClick={startGame} className="mt-4">
                  {t('startButton')}
                </Button>
              </motion.div>
            )}
            {gameState === 'ended' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="m-auto text-center p-8"
              >
                <CardTitle>{t('finishedTitle')}</CardTitle>
                <p className="text-muted-foreground mt-2">{t('finishedDescription')}</p>
                <Button onClick={startGame} className="mt-4">
                  {t('playAgainButton')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <ScoreBoard players={players} currentUserId={currentUserId} />
      </div>
    </div>
  );
}
