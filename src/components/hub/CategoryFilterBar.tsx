import { useTranslations } from '../../providers/I18nProvider';
import { Button } from '../ui/Button';
import { List } from 'lucide-react';

interface CategoryFilterBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryFilterBar({ activeCategory, setActiveCategory }: CategoryFilterBarProps) {
  const t = useTranslations('GamesHub.categories');

  const categories = [
    { id: 'all', name: t('all') },
    { id: 'quiz', name: t('quiz') },
    { id: 'strategy', name: t('strategy') },
    { id: 'puzzle', name: t('puzzle') },
    { id: 'community', name: t('community') },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <List className="h-5 w-5" />
        <h2 className="text-xl font-bold">{t('title')}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
