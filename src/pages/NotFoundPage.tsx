import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, MetaText, Panel, SectionTitle } from '../styles/primitives';

export function NotFoundPage() {
  return (
    <Panel
      as={motion.section}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <SectionTitle>404: This page wandered off.</SectionTitle>
      <MetaText>
        The route you requested does not exist in the current gallery experience.
      </MetaText>
      <Button as={Link} to="/">
        Return home
      </Button>
    </Panel>
  );
}

