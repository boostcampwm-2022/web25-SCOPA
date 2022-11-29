/** @jsxImportSource @emotion/react */

import { DescriptionListStyle, profileBoxWrapperStyle } from './BottomProfileBox.styles';
import { subtitleStyle } from './TopProfileBox.styles';

interface Props {
  workType: string;
  workTime: string;
  email: string;
  requirements: string[];
}

export const BottomProfileBox = ({ workType, workTime, email, requirements }: Props) => {
  return (
    <div css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <dl css={DescriptionListStyle}>
        <dt>작업 형태</dt>
        <dd>{workType}</dd>
        <dt>작업 선호 시간대</dt>
        <dd>{workTime}</dd>
        <dt>이메일</dt>
        <dd>{email}</dd>
        <dt>필수 요구사항</dt>
        <dd>#{requirements.join(' #')}</dd>
      </dl>
    </div>
  );
};
