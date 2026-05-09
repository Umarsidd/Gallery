import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: ${({ theme }) => theme.gradients.page};
    color: ${({ theme }) => theme.colors.text};
    transition: background 220ms ease, color 220ms ease;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: ${({ theme }) => (theme.mode === 'light' ? 0.3 : 0.12)};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }

  #root {
    min-height: 100vh;
  }

  *:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

