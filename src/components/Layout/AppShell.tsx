import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Container, Button } from '../../styles/primitives';
import { ToastViewport } from '../ToastViewport';
import { media } from '../../styles/media';

const Shell = styled.div`
  min-height: 100vh;
  padding: 1.1rem 0 2rem;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  padding-bottom: 1rem;
  backdrop-filter: blur(12px);
`;

const NavBar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  margin-top: 0.6rem;
`;

const BrandBlock = styled.div`
  display: grid;
  gap: 0.15rem;
`;

const Brand = styled(NavLink)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
`;

const Tagline = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const NavPill = styled(NavLink)`
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: background 180ms ease, color 180ms ease;

  &.active,
  &:hover {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Main = styled(Container)`
  display: grid;
  gap: 1.5rem;
  padding-top: 0.5rem;
`;

const Footer = styled.footer`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  text-align: center;
  padding-top: 2rem;
`;

const MobileWrap = styled.div`
  ${media.tablet`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `}
`;

export function AppShell() {
  const { themeMode, toggleTheme } = useAppContext();

  return (
    <Shell>
      <Header>
        <NavBar>
          <BrandBlock>
            <Brand to="/">Gallery</Brand>
            <Tagline>Interview-ready pet discovery experience</Tagline>
          </BrandBlock>
          <MobileWrap>
            <NavActions>
              <NavPill to="/" end>
                Explore
              </NavPill>
              <NavPill to="/about">About</NavPill>
              <Button
                type="button"
                $variant="ghost"
                onClick={toggleTheme}
                aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
              >
                {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </NavActions>
          </MobileWrap>
        </NavBar>
      </Header>

      <Main as={motion.main} layout>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Main>

      <Footer>
        <Container>
          Built with React, TypeScript, Vite, styled-components, Context API, and
          fetch.
        </Container>
      </Footer>

      <ToastViewport />
    </Shell>
  );
}

