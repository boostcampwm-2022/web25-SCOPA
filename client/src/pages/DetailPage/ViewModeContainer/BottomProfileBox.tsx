/** @jsxImportSource @emotion/react */

import { descriptionListStyle, descriptionTagWrapperStyle, profileBoxWrapperStyle } from './BottomProfileBox.styles';
import { subtitleStyle } from './TopProfileBox.styles';

interface Props {
  workType: string;
  workTime: string;
  requirements: string[];
}

export const BottomProfileBox = ({ workType, workTime, requirements }: Props) => {
  return (
    <section css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <div css={descriptionListStyle}>
        <h4>필수 요구사항</h4>
        <div css={descriptionTagWrapperStyle}>
          {requirements.map((requirement, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`requirement-${index}`}># {requirement}</span>
          ))}
        </div>
        <h4>작업 형태</h4>
        <span>{workType}</span>
        <h4>작업 선호 시간대</h4>
        <span>{workTime}</span>
      </div>
    </section>
  );
};
