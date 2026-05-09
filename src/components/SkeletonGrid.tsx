import styled, { keyframes } from 'styled-components';
import { Surface } from '../styles/primitives';
import { media } from '../styles/media';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Grid = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  ${media.tablet`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.desktop`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `}
`;

const Card = styled(Surface)`
  overflow: hidden;
  border-radius: 24px;
`;

const Block = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.05)
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

const Content = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
`;

export function SkeletonGrid() {
  return (
    <Grid aria-label="Loading pets">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <Block $height="220px" />
          <Content>
            <Block $height="22px" />
            <Block $height="14px" />
            <Block $height="56px" />
            <Block $height="38px" />
          </Content>
        </Card>
      ))}
    </Grid>
  );
}

