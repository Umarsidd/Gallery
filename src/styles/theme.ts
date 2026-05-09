import type { DefaultTheme } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    background: '#f5efe6',
    backgroundElevated: 'rgba(255, 255, 255, 0.82)',
    backgroundStrong: '#fffaf4',
    text: '#201714',
    textMuted: '#66544c',
    border: 'rgba(91, 67, 55, 0.14)',
    primary: '#cd5d3c',
    primaryStrong: '#a74529',
    accent: '#167b77',
    accentSoft: 'rgba(22, 123, 119, 0.16)',
    success: '#12705f',
    danger: '#b64034',
    shadow: '0 24px 50px rgba(77, 44, 30, 0.12)',
  },
  gradients: {
    page:
      'radial-gradient(circle at top left, rgba(255, 193, 125, 0.35), transparent 35%), radial-gradient(circle at top right, rgba(22, 123, 119, 0.18), transparent 28%), linear-gradient(180deg, #fbf7f2 0%, #f2e7dc 100%)',
    card:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 250, 244, 0.86))',
  },
};

const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: '#181311',
    backgroundElevated: 'rgba(31, 25, 21, 0.86)',
    backgroundStrong: '#261d19',
    text: '#f7efe8',
    textMuted: '#c2b0a5',
    border: 'rgba(255, 226, 204, 0.12)',
    primary: '#ff8d68',
    primaryStrong: '#ff7045',
    accent: '#5ce0ce',
    accentSoft: 'rgba(92, 224, 206, 0.16)',
    success: '#6ce3bf',
    danger: '#ff8b7a',
    shadow: '0 30px 60px rgba(0, 0, 0, 0.35)',
  },
  gradients: {
    page:
      'radial-gradient(circle at top left, rgba(255, 141, 104, 0.18), transparent 34%), radial-gradient(circle at top right, rgba(92, 224, 206, 0.16), transparent 24%), linear-gradient(180deg, #15100d 0%, #1d1714 100%)',
    card:
      'linear-gradient(180deg, rgba(38, 29, 25, 0.94), rgba(25, 20, 17, 0.92))',
  },
};

export function buildTheme(mode: ThemeMode): DefaultTheme {
  return mode === 'light' ? lightTheme : darkTheme;
}

