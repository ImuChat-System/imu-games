import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ImuChatProvider } from './providers/ImuChatProvider';
import { I18nProvider } from './providers/I18nProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImuChatProvider appId="imu-games">
      <I18nProvider>
        <App />
      </I18nProvider>
    </ImuChatProvider>
  </React.StrictMode>,
);
