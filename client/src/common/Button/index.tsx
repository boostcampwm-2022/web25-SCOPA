/** @jsxImportSource @emotion/react */

import { ButtonHTMLAttributes } from 'react';

import { buttonStyle } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  className?: string;
}

export const Button = ({ children, onClick, className }: Props) => {
  return (
    <button type='button' onClick={onClick} className={className} css={buttonStyle}>
      {children}
    </button>
  );
};
