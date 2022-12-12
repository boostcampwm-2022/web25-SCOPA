/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';

interface Props {
  children: JSX.Element;
}

export const MiniNavBar = ({ children }: Props) => {
  return <div css={miniNavBarWrapper}>{children}</div>;
};

const miniNavBarWrapper = css({
  backgroundColor: COLORS.WHITE,
  width: '100%',
  padding: `20px 50px`,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: `1px 3px 10px 1px ${COLORS.SHADOW}`,

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    padding: `30px 80px`,
  },
});
