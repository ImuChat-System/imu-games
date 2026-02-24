import { useTranslations } from '../../providers/I18nProvider';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users, Gamepad2, Send } from 'lucide-react';

export function CallToAction() {
  const t = useTranslations('GamesHub');

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            {t('ctaTitle')}
          </CardTitle>
          <CardDescription className="mt-2">
            {t('ctaDescription')}
          </CardDescription>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button>
            <Gamepad2 className="mr-2 h-4 w-4" />
            {t('ctaCreate')}
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            {t('ctaInvite')}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
