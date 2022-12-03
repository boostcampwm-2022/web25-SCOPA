import { User } from 'src/user/entities/user.entity';
import { Types } from 'mongoose';

export const USER: Record<string, User> = {
  STUB1: {
    authProvider: 'google',
    authId: '12345',
    email: 'aa@gmail.com',
    username: 'aaaaa',
    interest: 'frontend',
    techStack: ['react', 'recoil'],
    code: 'aaa', // 유저 생성 시에는 code가 들어가지 않음
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
  STUB2: {
    authProvider: 'github',
    authId: '00000',
    email: 'bb@gmail.com',
    username: 'bbbbb',
    interest: 'backend',
    techStack: ['java', 'nestjs'],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
  STUB3: {
    authProvider: 'google',
    authId: '11111',
    email: 'cc@gmail.com',
    username: 'abcde',
    interest: 'iOS',
    techStack: ['swift', 'nestjs'],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
};

// export const;
