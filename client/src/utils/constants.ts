import { nightOwl, a11yDark, ascetic, github, hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const STACK_LIST: ReadonlyArray<string> = [
  'React',
  'Redux',
  'Recoil',
  'Emotion',
  'Tailwind',
  'HTML',
  'Javascript',
  'Typescript',
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
];

export const INTEREST_LIST: ReadonlyArray<string> = ['Frontend', 'Backend', 'iOS', 'Android'];

export const API: Readonly<{ [key: string]: string }> = {
  LOGOUT: '/auth/logout',
  CHECK: '/auth/check',
  VALIDATE: '/users/validate',
  REGISTER: '/users/register',
  WITHDRAW: '/users/withdraw',
  DETAIL: '/users/',
  EDIT: '/users/edit',
  PROFILE: '/users',
  LIKE: '/like',
};

export const RESULT = { SUCCESS: 0, FAIL: 1, NULL: 2 };

export const CODE_THEME: Readonly<{ [key: string]: number }> = {
  nightOwl: 0,
  test2: 1,
  test3: 2,
  test4: 3,
  test5: 4,
};

export const CODE_SIZE: Readonly<{ [key: string]: number }> = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
};

export const THEME_LIST = [nightOwl, a11yDark, ascetic, github, hybrid];

export const CODE_EXAMPLE = `#include <stdio.h>

int main(void) {
    int value = 15;
    printf("hello world!\\n");
}`;
