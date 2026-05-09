import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import { GlobalStyle } from './styles/GlobalStyle';
import { buildTheme } from './styles/theme';

function ThemedApplication() {
  const { themeMode } = useAppContext();

  return (
    <ThemeProvider theme={buildTheme(themeMode)}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ThemedApplication />
      </AppProvider>
    </BrowserRouter>
  );
}

