import { CSSProperties } from 'react';
import { obsidian, github, nord, nnfxDark, xcode, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const STACK_LIST: ReadonlyArray<string> = [
  'React',
  'Redux',
  'Recoil',
  'Emotion',
  'Tailwind',
  'HTML',
  'JavaScript',
  'TypeScript',
  'Vue',
  'Angular',
  'C/C++',
  'Python',
  'Java',
  'Next.js',
  'Flutter',
  'Django',
  'MongoDB',
  'MySQL',
  'Swift',
  'Kotlin',
];

export const INTEREST_LIST: ReadonlyArray<string> = ['Frontend', 'Backend', 'iOS', 'Android'];

export const API: Readonly<Record<string, string>> = {
  LOGOUT: '/auth/logout',
  CHECK: '/auth/check',
  VALIDATE: '/users/validate',
  REGISTER: '/users/register',
  WITHDRAW: '/users/withdraw',
  DETAIL: '/users/',
  EDIT: '/users/edit',
  PROFILE: '/users',
  LIKE: '/like',
  MESSAGE_DETAIL: '/message', // :to
  MESSAGE_LIST: '/message/messages',
  MESSAGE_SEND: '/message/send',
};

export const LINK: Readonly<Record<string, string>> = {
  MAIN: '/',
  USERS: '/users',
  SETTINGS: '/settings',
  MYPAGE: '/mypage',
  LOGIN: '/login',
  REGISTER: '/register',
  MESSAGE: '/message',
};

export const CODE_SIZE: Readonly<{ size: number; name: string }[]> = [
  { size: 10, name: '매우 작음' },
  { size: 12, name: '작음' },
  { size: 16, name: '보통' },
  { size: 20, name: '큼' },
  { size: 24, name: '매우 큼' },
];

export const THEME_LIST: Readonly<
  { style: Record<string, CSSProperties>; name: string; backgroundColor: string; textColor: string }[]
> = [
  { style: atomOneLight, name: 'Atom One Light', backgroundColor: '#FAFAFA', textColor: '#4078F2' },
  { style: xcode, name: 'XCode', backgroundColor: '#FFFFFF', textColor: '#643820' },
  { style: github, name: 'Github', backgroundColor: '#F8F8F8', textColor: '#999999' },
  { style: obsidian, name: 'Obsidian', backgroundColor: '#292B2E', textColor: '#557182' },
  { style: nord, name: 'Nord', backgroundColor: '#2E3440', textColor: '#5E81AC' },
  { style: nnfxDark, name: 'NNFX Dark', backgroundColor: '#333333', textColor: '#AB8855' },
];

export const CODE_EXAMPLE = `#include <stdio.h>

int main(void) {
    int value = 15;
    printf("hello world!\\n");
}`;

export const LANGUAGE_LIST: Readonly<{ name: string; value: string }[]> = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Java', value: 'java' },
  { name: 'C/C++', value: 'cpp' },
  { name: 'Python', value: 'python' },
];

export const COMMON_ERROR: Readonly<string> = '잠시 후 다시 시도해주세요.';

export const VALIDATION_RESULT: Readonly<Record<string, number>> = {
  NULL: 0,
  SUCCESS: 1,
  WRONG_STR: 2,
  WRONG_LENGTH: 3,
  DUPLICATED: 4,
  CLIENT_FAIL: 5,
};

export const VALIDATION_INFO: Readonly<Record<string, string>> = {
  1: '유효한 아이디 입니다.',
  2: '알파벳과 숫자로만 이루어져야 합니다.',
  3: '4글자 이상 15글자 이하만 가능합니다.',
  4: '중복되는 Id 입니다.',
  5: '4글자 이상, 15글자 이하의 알파벳과 숫자로 작성바랍니다.',
};

export const INTEREST_KOR: Record<string, string> = {
  Frontend: '프론트엔드',
  Backend: '백엔드',
  iOS: 'iOS 앱',
  Android: '안드로이드 앱',
};

export const INTEREST_COLOR_BASE: Record<string, string> = {
  Frontend: '#E09A8E',
  Backend: '#CCE072',
  iOS: '#7BE0E0',
  Android: '#B182E0',
};

export const INTEREST_COLOR_BORDER: Record<string, string> = {
  Frontend: '#A16E65',
  Backend: '#94A353',
  iOS: '#5AA3A3',
  Android: '#805EA3',
};

export const FETCH_STATUS: Record<string, number> = {
  PENDING: 0,
  SUCCESS: 1,
  ERROR: 2,
};
