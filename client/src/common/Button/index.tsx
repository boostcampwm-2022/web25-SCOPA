/** @jsxImportSource @emotion/react */

import { ButtonHTMLAttributes } from 'react';

import { buttonStyle } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  className?: string;
  ariaLabel?: string;
}

export const Button = ({ children, onClick, className, ariaLabel }: Props) => {
  return (
    <button type='button' aria-label={ariaLabel} onClick={onClick} className={className} css={buttonStyle}>
      {children}
    </button>
  );
};
