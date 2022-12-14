import { User } from 'src/user/entities/user.entity';
import { Types } from 'mongoose';
import { Interest, Language, TechStack } from 'src/common/enum';

export const CREATE_USER: Record<string, User> = {
  STUB1: {
    authProvider: 'google',
    authId: '12345',
    username: 'aaaaa',
    interest: Interest.FRONTEND,
    techStack: [TechStack.REACT, TechStack.RECOIL],
    code: 'aaa', // 유저 생성 시에는 code가 들어가지 않음
    messageInfos: [],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
  STUB2: {
    authProvider: 'github',
    authId: '11111',
    username: 'bbbbb',
    interest: Interest.BACKEND,
    techStack: [TechStack.JAVA, TechStack.C_CPP],
    messageInfos: [],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
  STUB3: {
    authProvider: 'google',
    authId: '11111',
    username: 'abcde',
    interest: Interest.IOS,
    techStack: [TechStack.SWIFT, TechStack.PYTHON],
    messageInfos: [],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
};

export const FULL_USER: Record<string, User> = {
  STUB1: {
    authProvider: 'google',
    authId: '1928298',
    email: 'full1@gmail.com',
    username: 'full1',
    interest: Interest.FRONTEND,
    techStack: [TechStack.REACT, TechStack.RECOIL, TechStack.C_CPP],
    code: 'console.log(full1)',
    language: Language.TYPESCRIPT,
    worktype: 'everyday1',
    worktime: '1 to 1',
    requirements: ['this is 1'],
    messageInfos: [],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
  STUB2: {
    authProvider: 'github',
    authId: '143213',
    email: 'full2@gmail.com',
    username: 'full2',
    interest: Interest.BACKEND,
    techStack: [TechStack.TYPESCRIPT, TechStack.FLUTTER, TechStack.C_CPP],
    code: 'console.log(full2)',
    language: Language.JAVASCRIPT,
    worktype: 'everyday2',
    worktime: '2 to 2',
    requirements: ['this is 2'],
    messageInfos: [],
    _id: new Types.ObjectId(),
    createdAt: '',
    updatedAt: '',
  },
};
