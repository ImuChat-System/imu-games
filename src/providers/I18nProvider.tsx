import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import en from '../i18n/en.json';
import fr from '../i18n/fr.json';
import ja from '../i18n/ja.json';
import { useImuChat } from './ImuChatProvider';

type Locale = 'en' | 'fr' | 'ja';
type Messages = typeof en;

const messagesMap: Record<Locale, Messages> = { en, fr, ja };

interface I18nContextValue {
  locale: Locale;
  t: (namespace: string, key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: () => '',
  setLocale: () => {},
});

type TranslateFunction = (key: string, params?: Record<string, string | number>) => string;

export function useTranslations(namespace: string): TranslateFunction;
export function useTranslations(): { t: (namespace: string, key: string, params?: Record<string, string | number>) => string; locale: Locale };
export function useTranslations(namespace?: string) {
  const { t, locale } = useContext(I18nContext);
  if (namespace) {
    return ((key: string, params?: Record<string, string | number>) => t(namespace, key, params)) as TranslateFunction;
  }
  return { t, locale };
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale;
}

interface Props {
  children: ReactNode;
}

/**
 * Lightweight i18n provider.
 * Reads locale from the ImuChat SDK user if available, else from navigator.
 */
export function I18nProvider({ children }: Props) {
  const { user } = useImuChat();
  const detectedLocale = user?.locale || navigator.language.split('-')[0] || 'en';
  const [locale, setLocale] = useState<Locale>(
    (detectedLocale in messagesMap ? detectedLocale : 'en') as Locale,
  );

  useEffect(() => {
    if (user?.locale && user.locale in messagesMap) {
      setLocale(user.locale as Locale);
    }
  }, [user?.locale]);

  const t = (namespace: string, key: string): string => {
    const msgs = messagesMap[locale] as Record<string, unknown>;
    // Support nested keys: "GamesHub.categories.all" → msgs.GamesHub.categories.all
    const parts = namespace ? [...namespace.split('.'), ...key.split('.')] : key.split('.');
    let current: unknown = msgs;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return `${namespace}.${key}`;
      }
    }
    return typeof current === 'string' ? current : `${namespace}.${key}`;
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
