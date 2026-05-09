import { css } from 'styled-components';

export const breakpoints = {
  tablet: 768,
  desktop: 1200,
};

export const media = {
  tablet: (first: TemplateStringsArray, ...interpolations: any[]) => css`
    @media (min-width: ${breakpoints.tablet}px) {
      ${css(first, ...interpolations)}
    }
  `,
  desktop: (first: TemplateStringsArray, ...interpolations: any[]) => css`
    @media (min-width: ${breakpoints.desktop}px) {
      ${css(first, ...interpolations)}
    }
  `,
};
