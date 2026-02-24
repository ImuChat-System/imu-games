# ImuChat Games 🎮

Mini-app de jeux pour la plateforme ImuChat.

## Architecture

Cette mini-app fonctionne en **mode iframe** au sein de l'application mère ImuChat, en communiquant via le `@imuchat/miniapp-sdk` (protocole postMessage).

Elle peut également fonctionner en **mode standalone** pour le développement.

## Stack technique

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Lucide React** — icônes
- **@imuchat/miniapp-sdk** — communication avec l'hôte ImuChat

## Démarrage

```bash
# Installer les dépendances
pnpm install

# Lancer en mode développement
pnpm dev

# Build pour production
pnpm build
```

## Structure du projet

```
src/
├── main.tsx                    # Point d'entrée React
├── App.tsx                     # Router client-side
├── index.css                   # Styles globaux + Tailwind
├── providers/
│   ├── ImuChatProvider.tsx     # Connexion SDK + fallback standalone
│   └── I18nProvider.tsx        # i18n léger (en, fr, ja)
├── pages/
│   ├── GamesHub.tsx            # Hub principal (liste des jeux)
│   └── GameSlugPage.tsx        # Page d'un jeu spécifique
├── components/
│   ├── hub/                    # Composants du hub
│   │   ├── GameCard.tsx
│   │   ├── FeaturedCarousel.tsx
│   │   ├── CategoryFilterBar.tsx
│   │   └── CallToAction.tsx
│   ├── quiz/                   # Jeu Quiz
│   │   ├── QuizGame.tsx
│   │   ├── QuizQuestion.tsx
│   │   ├── QuizTimer.tsx
│   │   └── ScoreBoard.tsx
│   └── ui/                     # Composants UI atomiques
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Progress.tsx
├── i18n/                       # Traductions
│   ├── en.json
│   ├── fr.json
│   └── ja.json
└── lib/
    └── utils.ts                # Utilitaires (cn)
```

## Jeux disponibles

| Jeu | Slug | Statut |
|-----|------|--------|
| Anime Quiz | `/quiz` | ✅ Actif |
| Character Duel | `/duel` | 🔜 Coming soon |
| Genshin Puzzle | `/puzzle` | 🔜 Coming soon |
| Community Draw | `/draw` | 🔜 Coming soon |

## i18n

Langues supportées : `en` (English), `fr` (Français), `ja` (日本語)

La locale est détectée automatiquement via le SDK ImuChat ou le navigateur.

## Communication avec ImuChat

En mode iframe, la mini-app utilise les APIs suivantes du SDK :

- `auth.getUser()` — Récupère l'utilisateur connecté
- `storage.get/set` — Stockage persistant isolé
- `ui.showToast` — Notifications toast
- `theme.getCurrent()` — Synchronisation du thème

## Licence

MIT — ImuChat Team
