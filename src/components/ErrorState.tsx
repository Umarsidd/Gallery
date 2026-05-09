import styled from 'styled-components';
import { Button, MetaText, Panel, SectionTitle } from '../styles/primitives';

const Wrap = styled(Panel)`
  display: grid;
  gap: 0.75rem;
  justify-items: start;
  border-color: ${({ theme }) => theme.colors.danger};
`;

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Wrap role="alert">
      <SectionTitle>Something interrupted the gallery.</SectionTitle>
      <MetaText>
        {message}. Check your network access to the `/pets` endpoint and try
        again.
      </MetaText>
      <Button type="button" onClick={onRetry}>
        Retry Request
      </Button>
    </Wrap>
  );
}

