/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <div css={tooltipWrapperStyle}>
      <div css={tooltipInnerStyle}>
        <span>{text}</span>
      </div>
    </div>
  );
};

const tooltipWrapperStyle = css({
  position: 'absolute',
  width: 'fit-content',
  filter: `drop-shadow(0 0 3px ${COLORS.SHADOW})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: 32,
});

const tooltipInnerStyle = css({
  width: 'fit-content',
  whiteSpace: 'nowrap',
  backgroundColor: COLORS.WHITE,
  padding: 10,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});
