import { when } from 'jest-when';
import { plainToInstance } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';

import { USER } from './../test/stub';
import { errors } from 'src/common/response/index';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LikeRepository } from './../like/like.repository';
import { CreateUserRequest } from './dto/create-user.dto';

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
    create: jest.fn(),
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

  it('유저 전체를 조회한다.', () => {
    const users = [USER.STUB1];

    mockUserRepository.findAll.mockResolvedValue(users); // 비동기로 전체 유저 조회

    userService.findAll().then((result) => {
      expect(result).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('유저를 생성한다.', async () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: USER.STUB1.username,
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: USER.STUB1.authProvider,
        authId: USER.STUB1.authId,
        email: USER.STUB1.email,
      };

      when(mockUserRepository.findUserByUsername)
        .calledWith(userDto.username)
        .mockResolvedValue(null);

      mockUserRepository.create.mockResolvedValue(USER.STUB1);

      when(mockLikeRepository.create)
        .calledWith(USER.STUB1._id.toString())
        .mockResolvedValue({});

      const createdUser = await userService.createUser(userDto, authInfo);

      expect(createdUser).toEqual(USER.STUB1);
    });

    it('생성 유저의 username이 4미만이면 오류가 발생한다.', () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: 'abc',
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: USER.STUB1.authProvider,
        authId: USER.STUB1.authId,
        email: USER.STUB1.email,
      };

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.INVALID_ID,
      );
    });

    it('생성 유저의 username이 15초과이면 오류가 발생한다.', () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: 'abcdefghijklmnop',
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: USER.STUB1.authProvider,
        authId: USER.STUB1.authId,
        email: USER.STUB1.email,
      };

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.INVALID_ID,
      );
    });

    it('알파벳이나 숫자로 구성되지 않은 username은 오류가 발생한다.', () => {
      const userDto1 = plainToInstance(CreateUserRequest, {
        username: 'abcd!',
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const userDto2 = plainToInstance(CreateUserRequest, {
        username: '        ',
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const userDto3 = plainToInstance(CreateUserRequest, {
        username: '???????',
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: USER.STUB1.authProvider,
        authId: USER.STUB1.authId,
        email: USER.STUB1.email,
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

    it('중복된 username은 오류가 발생한다.', () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: USER.STUB1.username,
        interest: USER.STUB1.interest,
        techStack: USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: USER.STUB1.authProvider,
        authId: USER.STUB1.authId,
        email: USER.STUB1.email,
      };

      when(mockUserRepository.findUserByUsername)
        .calledWith(userDto.username)
        .mockResolvedValue(USER.STUB1);

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.ID_DUPLICATED,
      );
    });
  });

  it('authProvider와 authId로 유저를 조회한다.', async () => {
    const authProvider = USER.STUB1.authProvider;
    const authId = USER.STUB1.authId;
    when(mockUserRepository.findUserByAuthProviderAndAuthId)
      .calledWith(authProvider, authId)
      .mockResolvedValue(USER.STUB1);

    const findUser = await userService.findOne(authProvider, authId);
    expect(findUser).toEqual(USER.STUB1);
  });

  describe('remove', () => {
    it('userId로 유저를 삭제한다.', async () => {
      const userId = USER.STUB1._id.toString();
      const deleteResult = { acknowledged: true, deletedCount: 1 };
      when(mockUserRepository.findUserById)
        .calledWith(userId)
        .mockResolvedValue(USER.STUB1);

      when(mockUserRepository.deleteById)
        .calledWith(userId)
        .defaultResolvedValue(deleteResult);

      expect(await userService.remove(userId)).toEqual(deleteResult);
    });

    it('삭제하려는 userId가 없으면 오류가 발생한다.', () => {
      const userId = '12345678';
      when(mockUserRepository.findUserById)
        .calledWith(userId)
        .defaultResolvedValue(null);

      expect(userService.remove(userId)).rejects.toEqual(
        errors.NOT_MATCHED_USER,
      );
    });
  });
});
