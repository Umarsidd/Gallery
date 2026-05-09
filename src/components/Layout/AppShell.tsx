import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Container, Button } from '../../styles/primitives';
import { ToastViewport } from '../ToastViewport';
import { media } from '../../styles/media';

const Shell = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
`;

const NavBar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0;
  min-height: 56px;
  background: ${({ theme }) => theme.colors.backgroundElevated};
`;

const BrandBlock = styled.div`
  display: grid;
  gap: 0;
`;

const Brand = styled(NavLink)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  line-height: 0.9;
  font-weight: 700;
  color: #ffffff;
  font-style: italic;
`;

const Tagline = styled.span`
  color: #ffe46b;
  font-size: 0.76rem;
  font-weight: 700;

  strong {
    color: #ffffff;
  }
`;

const SearchWrap = styled.div`
  display: none;
  flex: 1;
  max-width: 560px;
  align-items: center;
  margin: 0 0.5rem;
  background: #ffffff;
  border-radius: 2px;
  padding: 0 0.9rem;

  ${media.tablet`
    display: flex;
  `}
`;

const HeaderSearch = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: #111827;
  padding: 0.85rem 0;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 700;
`;

const NavActions = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const NavPill = styled(NavLink)`
  padding: 0.65rem 0.5rem;
  font-weight: 700;
  color: #ffffff;
  transition: opacity 180ms ease, color 180ms ease;
  white-space: nowrap;

  &.active,
  &:hover {
    opacity: 0.9;
    color: #ffffff;
  }
`;

const UtilityButton = styled(Button)`
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 112px;
`;

const CategoryStrip = styled.div`
  background: ${({ theme }) => theme.colors.backgroundStrong};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CategoryRow = styled(Container)`
  display: none;

  ${media.tablet`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 0;
    overflow-x: auto;
  `}
`;

const CategoryItem = styled.span`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

const Main = styled(Container)`
  display: grid;
  gap: 1.25rem;
  padding-top: 1rem;
`;

const Footer = styled.footer`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  text-align: center;
  padding: 2rem 0;
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
            <Tagline>
              Explore <strong>Plus</strong>
            </Tagline>
          </BrandBlock>
          <SearchWrap aria-hidden="true">
            <HeaderSearch
              placeholder="Search for pets, personalities and companions"
              readOnly
              tabIndex={-1}
            />
            <SearchIcon>⌕</SearchIcon>
          </SearchWrap>
          <MobileWrap>
            <NavActions>
              <NavPill to="/" end>
                Explore
              </NavPill>
              <NavPill to="/about">About</NavPill>
              <UtilityButton
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
              >
                {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </UtilityButton>
            </NavActions>
          </MobileWrap>
        </NavBar>
        <CategoryStrip>
          <CategoryRow>
            <CategoryItem>Dogs</CategoryItem>
            <CategoryItem>Cats</CategoryItem>
            <CategoryItem>Paired Pets</CategoryItem>
            <CategoryItem>Small Pets</CategoryItem>
            <CategoryItem>New Arrivals</CategoryItem>
            <CategoryItem>Selected Picks</CategoryItem>
            <CategoryItem>Download Ready</CategoryItem>
          </CategoryRow>
        </CategoryStrip>
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
