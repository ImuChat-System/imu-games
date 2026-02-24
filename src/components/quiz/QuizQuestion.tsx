import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { useTranslations } from '../../providers/I18nProvider';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    choices: { id: string; label: string }[];
    correctChoiceId: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export function QuizQuestion({ question, onAnswer, disabled }: QuizQuestionProps) {
  const t = useTranslations('QuizGame');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleAnswerClick = (choiceId: string) => {
    if (disabled) return;
    setSelectedChoice(choiceId);
    onAnswer(choiceId === question.correctChoiceId);
  };

  const getButtonVariant = (choiceId: string): 'outline' | 'destructive' | 'default' => {
    if (!disabled) return 'outline';
    if (choiceId === question.correctChoiceId) return 'default';
    if (choiceId === selectedChoice) return 'destructive';
    return 'outline';
  };

  const getButtonIcon = (choiceId: string) => {
    if (!disabled) return null;
    if (choiceId === question.correctChoiceId) return <CheckCircle2 className="h-5 w-5" />;
    if (choiceId === selectedChoice) return <XCircle className="h-5 w-5" />;
    return null;
  };

  // Reset selection when question changes
  useEffect(() => {
    setSelectedChoice(null);
  }, [question.id]);

  return (
    <Card className="w-full max-w-2xl text-center border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{question.text}</CardTitle>
        <CardDescription>{t('questionDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.choices.map((choice) => (
            <Button
              key={choice.id}
              variant={getButtonVariant(choice.id)}
              className={cn(
                'text-base p-6 h-auto whitespace-normal justify-between transition-all duration-300',
                {
                  'transform hover:scale-105': !disabled,
                  'bg-green-500 hover:bg-green-600 text-white':
                    disabled && choice.id === question.correctChoiceId,
                  'bg-red-500 hover:bg-red-600 text-white':
                    disabled && choice.id === selectedChoice && choice.id !== question.correctChoiceId,
                },
              )}
              onClick={() => handleAnswerClick(choice.id)}
              disabled={disabled}
            >
              <span>{choice.label}</span>
              {getButtonIcon(choice.id)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
