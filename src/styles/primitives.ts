import styled, { css } from 'styled-components';
import { media } from './media';

export const Container = styled.div`
  width: min(1400px, calc(100% - 1.25rem));
  margin: 0 auto;

  ${media.tablet`
    width: min(1400px, calc(100% - 2rem));
  `}
`;

export const Surface = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.gradients.card};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

export const Panel = styled(Surface)`
  border-radius: 4px;
  padding: 1rem;

  ${media.tablet`
    padding: 1rem;
  `}
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.35rem, 2.2vw, 1.9rem);
  line-height: 1.2;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const sharedFieldStyles = css`
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundStrong};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.8rem 0.95rem;
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
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 0.78rem 1rem;
  font-weight: 700;
  transition: transform 180ms ease, opacity 180ms ease, background 180ms ease;

  ${({ theme, $variant = 'primary' }) => {
    if ($variant === 'secondary') {
      return css`
        background: ${theme.colors.accent};
        color: #ffffff;
      `;
    }

    if ($variant === 'ghost') {
      return css`
        background: ${theme.colors.backgroundStrong};
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
  font-size: 0.92rem;
  line-height: 1.55;
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
  padding: 0.32rem 0.6rem;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
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
