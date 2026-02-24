import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/Card';

const FEATURED_ITEMS = [
  {
    title: 'New Quiz Event!',
    description: 'Test your knowledge on the latest anime season.',
    image: 'https://placehold.co/800x400.png',
  },
  {
    title: 'Character Duel Beta',
    description: 'The beta for our new turn-based duel game is now open!',
    image: 'https://placehold.co/800x400.png',
  },
  {
    title: 'Community Theme Contest',
    description: 'Create a theme and win exclusive prizes.',
    image: 'https://placehold.co/800x400.png',
  },
];

/**
 * Simple auto-advancing carousel — replaces embla-carousel dependency.
 */
export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const item = FEATURED_ITEMS[currentIndex];

  return (
    <div className="relative w-full">
      <Card className="overflow-hidden">
        <CardContent className="relative flex aspect-[2/1] items-center justify-center p-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-white/80 mt-1">{item.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {FEATURED_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
