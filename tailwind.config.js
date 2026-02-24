/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--imu-primary, #6366f1)',
        'primary-foreground': 'var(--imu-primary-foreground, #ffffff)',
        background: 'var(--imu-background, #ffffff)',
        foreground: 'var(--imu-foreground, #0f0f0f)',
        card: 'var(--imu-card, #f8f9fa)',
        'card-foreground': 'var(--imu-card-foreground, #0f0f0f)',
        muted: 'var(--imu-muted, #f1f5f9)',
        'muted-foreground': 'var(--imu-muted-foreground, #64748b)',
        destructive: 'var(--imu-destructive, #ef4444)',
        'destructive-foreground': 'var(--imu-destructive-foreground, #ffffff)',
        border: 'var(--imu-border, #e2e8f0)',
        ring: 'var(--imu-ring, #6366f1)',
      },
      borderRadius: {
        lg: 'var(--imu-radius, 0.5rem)',
        md: 'calc(var(--imu-radius, 0.5rem) - 2px)',
        sm: 'calc(var(--imu-radius, 0.5rem) - 4px)',
      },
    },
  },
  plugins: [],
};
