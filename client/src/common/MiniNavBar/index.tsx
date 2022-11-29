/** @jsxImportSource @emotion/react */

import { miniNavBarWrapper } from './styles';

interface Props {
  children: JSX.Element;
}

export const MiniNavBar = ({ children }: Props) => {
  return <nav css={miniNavBarWrapper}>{children}</nav>;
};
