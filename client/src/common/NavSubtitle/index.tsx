/** @jsxImportSource @emotion/react */

import { subtitleStyle } from './styles';

interface Props {
  text: string;
}

export const NavSubtitle = ({ text }: Props) => {
  return <h2 css={subtitleStyle}>{text}</h2>;
};
