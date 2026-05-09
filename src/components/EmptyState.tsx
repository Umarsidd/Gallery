import styled from 'styled-components';
import { Button, MetaText, Panel, SectionTitle } from '../styles/primitives';

const Wrap = styled(Panel)`
  display: grid;
  gap: 0.85rem;
  justify-items: start;
`;

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Wrap>
      <SectionTitle>{title}</SectionTitle>
      <MetaText>{description}</MetaText>
      {actionLabel && onAction ? (
        <Button type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Wrap>
  );
}

