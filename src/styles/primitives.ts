import styled, { css } from 'styled-components';
import { media } from './media';

export const Container = styled.div`
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;

  ${media.tablet`
    width: min(1180px, calc(100% - 3rem));
  `}
`;

export const Surface = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.gradients.card};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(16px);
`;

export const Panel = styled(Surface)`
  border-radius: 24px;
  padding: 1rem;

  ${media.tablet`
    padding: 1.25rem;
  `}
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  line-height: 1;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const sharedFieldStyles = css`
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundStrong};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.95rem 1rem;
  transition: border-color 180ms ease, transform 180ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  ${sharedFieldStyles}
`;

export const Select = styled.select`
  ${sharedFieldStyles}
  appearance: none;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'ghost' }>`
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.2rem;
  font-weight: 700;
  transition: transform 180ms ease, opacity 180ms ease, background 180ms ease;

  ${({ theme, $variant = 'primary' }) => {
    if ($variant === 'secondary') {
      return css`
        background: ${theme.colors.accentSoft};
        color: ${theme.colors.accent};
      `;
    }

    if ($variant === 'ghost') {
      return css`
        background: transparent;
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
      `;
    }

    return css`
      background: ${theme.colors.primary};
      color: #fff8f1;
    `;
  }}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const MetaText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.82rem;
  font-weight: 700;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

