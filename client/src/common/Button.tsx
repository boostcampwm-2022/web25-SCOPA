/** @jsxImportSource @emotion/react */

import { ButtonHTMLAttributes } from 'react';
import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  className?: string;
  ariaLabel?: string;
  isSubmit?: boolean;
}

export const Button = ({ children, onClick, className, ariaLabel, isSubmit }: Props) => {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      css={buttonStyle}
    >
      {children}
    </button>
  );
};

const buttonStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  padding: `5px 20px`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  transition: `0.1s linear`,

  ':hover': {
    backgroundColor: COLORS.PRIMARY_2,
  },

  ' span': {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
  },
});
