import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eyebrow, MetaText, Panel, SectionTitle } from '../styles/primitives';

const Content = styled(Panel)`
  display: grid;
  gap: 1rem;
  max-width: 860px;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export function AboutPage() {
  return (
    <Content
      as={motion.section}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Eyebrow>Architecture</Eyebrow>
      <SectionTitle>Built to feel polished in the browser and thoughtful in review.</SectionTitle>
      <MetaText>
        The application uses a lightweight clean-architecture approach: API access
        lives in `src/api`, cross-route state is handled in a single Context
        provider, reusable UI pieces live in `src/components`, and route-level
        concerns stay inside `src/pages`.
      </MetaText>
      <List>
        <li>`usePets()` centralizes filtering, sorting, empty states, and client-side pagination.</li>
        <li>Selection state, theme mode, and file-size cache persist through `localStorage`.</li>
        <li>Styled-components power the full visual system, including theme tokens and responsive helpers.</li>
        <li>Accessibility includes semantic landmarks, focus treatment, toast announcements, and labeled form controls.</li>
      </List>
    </Content>
  );
}

