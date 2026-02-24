import type { ImuChat } from '@imuchat/miniapp-sdk';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ImuChatContextValue {
  app: ImuChat | null;
  isConnected: boolean;
  user: { id: string; username: string; displayName: string; avatarUrl: string | null; locale: string } | null;
}

const ImuChatContext = createContext<ImuChatContextValue>({
  app: null,
  isConnected: false,
  user: null,
});

export function useImuChat() {
  return useContext(ImuChatContext);
}

interface Props {
  appId: string;
  children: ReactNode;
}

/**
 * Provider that initializes the ImuChat SDK.
 * In standalone mode (development), it creates a mock connection.
 */
export function ImuChatProvider({ appId, children }: Props) {
  const [app, setApp] = useState<ImuChat | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<ImuChatContextValue['user']>(null);

  useEffect(() => {
    let instance: ImuChat | null = null;

    async function init() {
      try {
        // Dynamic import to handle cases where SDK isn't available
        const { ImuChat: SDK } = await import('@imuchat/miniapp-sdk');
        instance = SDK.init({ appId });
        await instance.ready();
        setApp(instance);

        // Fetch user info
        const currentUser = await instance.auth.getUser();
        setUser(currentUser);

        setIsConnected(true);
      } catch {
        // Standalone / dev mode — run without SDK connection
        console.warn('[imu-games] Running in standalone mode (no ImuChat host detected)');
        setUser({
          id: 'dev-user',
          username: 'dev',
          displayName: 'Developer',
          avatarUrl: null,
          locale: navigator.language.split('-')[0] || 'en',
        });
        setIsConnected(true);
      }
    }

    init();

    return () => {
      instance?.destroy();
    };
  }, [appId]);

  return (
    <ImuChatContext.Provider value={{ app, isConnected, user }}>
      {children}
    </ImuChatContext.Provider>
  );
}
