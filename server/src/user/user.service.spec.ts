import { Types } from 'mongoose';
import { when } from 'jest-when';
import { plainToInstance } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LikeRepository } from './../like/like.repository';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { errors } from 'src/common/response/error-response';

describe('UserService', () => {
  const mockUserRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findUserByAuthProviderAndAuthId: jest.fn(),
    findUserByUsername: jest.fn(),
    findUserById: jest.fn(),
    deleteById: jest.fn(),
  };

  const mockLikeRepository = {
    createLike: jest.fn(),
  };

  const userStub: User = {
    authProvider: 'google',
    authId: '12345',
    email: 'aa@gmail.com',
    username: 'abcde',
    interest: 'frontend',
    techStack: ['react', 'recoil'],
    _id: new Types.ObjectId('637f8ec80b9f9e762f47c269'),
    createdAt: '',
    updatedAt: '',
  };

  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: LikeRepository,
          useValue: mockLikeRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('유저 전체 조회', () => {
    const users = [userStub];

    mockUserRepository.findAll.mockResolvedValue(users); // 비동기로 전체 유저 조회

    userService.findAll().then((result) => {
      expect(result).toEqual(users);
    });
  });

  it('유저 생성', async () => {
    const userDto = plainToInstance(CreateUserRequestDto, {
      username: userStub.username,
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const authInfo = {
      authProvider: userStub.authProvider,
      authId: userStub.authId,
      email: userStub.email,
    };

    when(mockUserRepository.findUserByUsername)
      .calledWith(userDto.username)
      .mockResolvedValue(null);

    mockUserRepository.create.mockResolvedValue(userStub);

    when(mockLikeRepository.createLike)
      .calledWith(userStub._id.toString())
      .mockResolvedValue({});

    const createdUser = await userService.createUser(userDto, authInfo);

    expect(createdUser).toEqual(userStub);
  });

  it('생성 유저의 username이 4미만이면 오류', () => {
    const userDto = plainToInstance(CreateUserRequestDto, {
      username: 'abc',
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const authInfo = {
      authProvider: userStub.authProvider,
      authId: userStub.authId,
      email: userStub.email,
    };

    expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
      errors.INVALID_ID,
    );
  });

  it('생성 유저의 username이 15초과이면 오류', () => {
    const userDto = plainToInstance(CreateUserRequestDto, {
      username: 'abcdefghijklmnop',
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const authInfo = {
      authProvider: userStub.authProvider,
      authId: userStub.authId,
      email: userStub.email,
    };

    expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
      errors.INVALID_ID,
    );
  });

  it('알파벳이나 숫자로 구성되지 않은 username은 오류', () => {
    const userDto1 = plainToInstance(CreateUserRequestDto, {
      username: 'abcd!',
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const userDto2 = plainToInstance(CreateUserRequestDto, {
      username: '        ',
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const userDto3 = plainToInstance(CreateUserRequestDto, {
      username: '???????',
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const authInfo = {
      authProvider: userStub.authProvider,
      authId: userStub.authId,
      email: userStub.email,
    };

    expect(userService.createUser(userDto1, authInfo)).rejects.toEqual(
      errors.INVALID_ID,
    );
    expect(userService.createUser(userDto2, authInfo)).rejects.toEqual(
      errors.INVALID_ID,
    );
    expect(userService.createUser(userDto3, authInfo)).rejects.toEqual(
      errors.INVALID_ID,
    );
  });

  it('중복된 username은 오류', () => {
    const userDto = plainToInstance(CreateUserRequestDto, {
      username: userStub.username,
      interest: userStub.interest,
      techStack: userStub.techStack,
    });
    const authInfo = {
      authProvider: userStub.authProvider,
      authId: userStub.authId,
      email: userStub.email,
    };

    when(mockUserRepository.findUserByUsername)
      .calledWith(userDto.username)
      .mockResolvedValue(userStub);

    expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
      errors.ID_DUPLICATED,
    );
  });
});
