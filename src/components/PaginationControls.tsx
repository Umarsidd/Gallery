import styled from 'styled-components';
import { Button, Panel } from '../styles/primitives';

const Wrap = styled(Panel)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const PageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PageLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
`;

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Wrap aria-label="Pagination controls">
      <Button
        type="button"
        $variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <PageButtons>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <Button
              key={page}
              type="button"
              $variant={page === currentPage ? 'primary' : 'ghost'}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          );
        })}
      </PageButtons>

      <PageLabel>
        Page {currentPage} of {totalPages}
      </PageLabel>
    </Wrap>
  );
}

