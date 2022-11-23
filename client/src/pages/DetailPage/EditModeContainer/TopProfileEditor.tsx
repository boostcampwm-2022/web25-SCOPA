/** @jsxImportSource @emotion/react */

import { profileBoxWrapperStyle } from './TopProfileEditor.styles';

interface Props {
  interest: string;
  techStack: string[];
}

export const TopProfileEditor = ({ interest, techStack }: Props) => {
  return (
    <div css={profileBoxWrapperStyle}>
      <fieldset>
        <label htmlFor='top-profile-interest'>저는 이런 분야에 자신있어요</label>
        <input id='top-profile-interest' type='text' />
        <label htmlFor='top-profile-techstack'>저는 이런 기술을 사용할 수 있어요</label>
        <input id='top-profile-techstack' type='text' />
      </fieldset>
    </div>
  );
};
