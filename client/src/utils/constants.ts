import { CSSProperties } from 'react';
import { obsidian, github, nord, nnfxDark, xcode, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
  atoOneLight: 0,
  xcode: 1,
  github: 2,
  obsidian: 3,
  nord: 4,
  nnfxDark: 5,
};

export const CODE_SIZE: Readonly<{ size: number; name: string }[]> = [
  { size: 10, name: '매우 작음' },
  { size: 12, name: '작음' },
  { size: 16, name: '보통' },
  { size: 20, name: '큼' },
  { size: 24, name: '매우 큼' },
];

export const THEME_LIST: Readonly<{ style: { [key: string]: CSSProperties }; name: string }[]> = [
  { style: atomOneLight, name: 'Atom One Light' },
  { style: xcode, name: 'XCode' },
  { style: github, name: 'Github' },
  { style: obsidian, name: 'Obsidian' },
  { style: nord, name: 'Nord' },
  { style: nnfxDark, name: 'NNFX Dark' },
];

export const CODE_EXAMPLE = `#include <stdio.h>

int main(void) {
    int value = 15;
    printf("hello world!\\n");
}`;
