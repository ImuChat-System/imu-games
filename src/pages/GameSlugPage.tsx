import { useTranslations } from '../providers/I18nProvider';
import { QuizGame } from '../components/quiz/QuizGame';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

interface GameSlugPageProps {
  gameSlug: string;
  onBack: () => void;
}

function GameScreen({ gameSlug }: { gameSlug: string }) {
  const t = useTranslations('GameSlug');

  switch (gameSlug) {
    case 'quiz':
      return <QuizGame />;
    default:
      return (
        <Card className="w-full max-w-4xl text-center">
          <CardHeader>
            <CardTitle>{gameSlug}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('comingSoon')}</p>
          </CardContent>
        </Card>
      );
  }
}

export function GameSlugPage({ gameSlug, onBack }: GameSlugPageProps) {
  const t = useTranslations('GameSlug');

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('back')}
      </Button>
      <div className="flex items-center justify-center min-h-[70vh]">
        <GameScreen gameSlug={gameSlug} />
      </div>
    </div>
  );
}
