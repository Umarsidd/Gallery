import type { DefaultTheme } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    background: '#f1f3f6',
    backgroundElevated: '#2874f0',
    backgroundStrong: '#ffffff',
    text: '#212121',
    textMuted: '#6b7280',
    border: '#e5e7eb',
    primary: '#2874f0',
    primaryStrong: '#1d5ec6',
    accent: '#fb641b',
    accentSoft: '#e8f0fe',
    success: '#118c4f',
    danger: '#d93025',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
  },
  gradients: {
    page: 'linear-gradient(180deg, #f1f3f6 0%, #eef2f7 100%)',
    card: 'linear-gradient(180deg, #ffffff, #ffffff)',
  },
};

const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: '#10141d',
    backgroundElevated: '#1a56c4',
    backgroundStrong: '#17202e',
    text: '#f7fafc',
    textMuted: '#a5b4c4',
    border: '#273244',
    primary: '#5c9cff',
    primaryStrong: '#7db0ff',
    accent: '#ff9f5a',
    accentSoft: 'rgba(92, 156, 255, 0.16)',
    success: '#5dd39e',
    danger: '#ff8d85',
    shadow: '0 12px 24px rgba(0, 0, 0, 0.28)',
  },
  gradients: {
    page: 'linear-gradient(180deg, #10141d 0%, #141b26 100%)',
    card: 'linear-gradient(180deg, #17202e, #17202e)',
  },
};

export function buildTheme(mode: ThemeMode): DefaultTheme {
  return mode === 'light' ? lightTheme : darkTheme;
}
