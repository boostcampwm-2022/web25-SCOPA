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

export const CODE_SIZE: Readonly<{ size: number; name: string }[]> = [
  { size: 10, name: '매우 작음' },
  { size: 12, name: '작음' },
  { size: 16, name: '보통' },
  { size: 20, name: '큼' },
  { size: 24, name: '매우 큼' },
];

export const THEME_LIST: Readonly<
  { style: { [key: string]: CSSProperties }; name: string; backgroundColor: string; textColor: string }[]
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
