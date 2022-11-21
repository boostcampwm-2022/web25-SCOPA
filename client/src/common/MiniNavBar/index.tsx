/** @jsxImportSource @emotion/react */

import { miniNavBarWrapper } from './styles';

interface Props {
  children: JSX.Element;
}

export const MiniNavBar = ({ children }: Props) => {
  return <div css={miniNavBarWrapper}>{children}</div>;
};
