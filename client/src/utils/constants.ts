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
