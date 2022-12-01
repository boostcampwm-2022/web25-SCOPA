import { ProfileType } from 'types/profile';

export const MockUpData: ProfileType = {
  id: '1',
  nickname: 'earlybird',
  code: `import { API } from 'utils/constants';

export async function fetchCheckLogin() {
	const data = await fetch(\`\${process.env.REACT_APP_FETCH_URL}\${API.CHECK}\`, { credentials: 'include' })
	  .then((response) => response.json())
	  .catch(() => {
		return { code: 0, body: null };
	  });
	  // a
	  // a
	  // a
	  // a
	  // aa
	  //
	  // a
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	  // a엄청나게긴코드
	return data;
  }`,
  language: 'typescript',
  interest: 'frontend',
  skills: ['React', 'Emotion', 'Typescript'],
  requirements: ['잠실사는사람만', '소통좋아해요'],
  liked: false,
  worktype: '페어 프로그래밍, 잠실역 근처',
  worktime: '새벽은 타협 가능하고 오후 1시부터 항상 비어있어요',
  email: 'earlybird@boostcamp.org',
};
