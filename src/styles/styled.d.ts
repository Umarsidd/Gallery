import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: {
      background: string;
      backgroundElevated: string;
      backgroundStrong: string;
      text: string;
      textMuted: string;
      border: string;
      primary: string;
      primaryStrong: string;
      accent: string;
      accentSoft: string;
      success: string;
      danger: string;
      shadow: string;
    };
    gradients: {
      page: string;
      card: string;
    };
  }
}

