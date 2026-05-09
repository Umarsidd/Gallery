import styled, { css } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Wrap = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 30;
  display: grid;
  gap: 0.75rem;
  width: min(360px, calc(100% - 2rem));
`;

const Toast = styled(motion.div)<{ $tone: 'info' | 'success' | 'error' }>`
  padding: 0.95rem 1rem;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  background: ${({ theme }) => theme.colors.backgroundStrong};

  ${({ $tone, theme }) =>
    $tone === 'success'
      ? css`
          border-color: ${theme.colors.success};
        `
      : $tone === 'error'
        ? css`
            border-color: ${theme.colors.danger};
          `
        : css`
            border-color: ${theme.colors.accent};
          `}
`;

export function ToastViewport() {
  const { toasts } = useAppContext();

  return (
    <Wrap aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            $tone={toast.tone ?? 'info'}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            {toast.message}
          </Toast>
        ))}
      </AnimatePresence>
    </Wrap>
  );
}

