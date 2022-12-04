import { when } from 'jest-when';
import { plainToInstance } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';

import { errors } from 'src/common/response/index';
import { SessionInfo } from 'src/common/d';
import { CREATE_USER, FULL_USER } from './../test/stub';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LikeRepository } from './../like/like.repository';
import { CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';

describe('UserService', () => {
  const mockUserRepository = {
    create: jest.fn(),
    findByAuthProviderAndAuthId: jest.fn(),
    findByUsername: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
    update: jest.fn(),
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

  describe('createUser', () => {
    it('유저를 생성한다.', async () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: CREATE_USER.STUB1.username,
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: CREATE_USER.STUB1.authProvider,
        authId: CREATE_USER.STUB1.authId,
        email: CREATE_USER.STUB1.email,
      };

      when(mockUserRepository.findByUsername)
        .calledWith(userDto.username)
        .mockResolvedValue(null);

      mockUserRepository.create.mockResolvedValue(CREATE_USER.STUB1);

      when(mockLikeRepository.create)
        .calledWith(CREATE_USER.STUB1._id.toString())
        .mockResolvedValue({});

      const createdUser = await userService.createUser(userDto, authInfo);

      expect(createdUser).toEqual(CREATE_USER.STUB1);
    });

    it('생성 유저의 username이 4미만이면 오류가 발생한다.', () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: 'abc',
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: CREATE_USER.STUB1.authProvider,
        authId: CREATE_USER.STUB1.authId,
        email: CREATE_USER.STUB1.email,
      };

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.INVALID_ID,
      );
    });

    it('생성 유저의 username이 15초과이면 오류가 발생한다.', () => {
      const userDto = plainToInstance(CreateUserRequest, {
        username: 'abcdefghijklmnop',
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: CREATE_USER.STUB1.authProvider,
        authId: CREATE_USER.STUB1.authId,
        email: CREATE_USER.STUB1.email,
      };

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.INVALID_ID,
      );
    });

    it('알파벳이나 숫자로 구성되지 않은 username은 오류가 발생한다.', () => {
      const userDto1 = plainToInstance(CreateUserRequest, {
        username: 'abcd!',
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const userDto2 = plainToInstance(CreateUserRequest, {
        username: '        ',
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const userDto3 = plainToInstance(CreateUserRequest, {
        username: '???????',
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: CREATE_USER.STUB1.authProvider,
        authId: CREATE_USER.STUB1.authId,
        email: CREATE_USER.STUB1.email,
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
        username: CREATE_USER.STUB1.username,
        interest: CREATE_USER.STUB1.interest,
        techStack: CREATE_USER.STUB1.techStack,
      });
      const authInfo = {
        authProvider: CREATE_USER.STUB1.authProvider,
        authId: CREATE_USER.STUB1.authId,
        email: CREATE_USER.STUB1.email,
      };

      when(mockUserRepository.findByUsername)
        .calledWith(userDto.username)
        .mockResolvedValue(CREATE_USER.STUB1);

      expect(userService.createUser(userDto, authInfo)).rejects.toEqual(
        errors.ID_DUPLICATED,
      );
    });
  });

  it('authProvider와 authId로 유저를 조회한다.', async () => {
    const authProvider = CREATE_USER.STUB1.authProvider;
    const authId = CREATE_USER.STUB1.authId;
    when(mockUserRepository.findByAuthProviderAndAuthId)
      .calledWith(authProvider, authId)
      .mockResolvedValue(CREATE_USER.STUB1);

    const findUser = await userService.findUserByAuth(authProvider, authId);
    expect(findUser).toEqual(CREATE_USER.STUB1);
  });

  describe('remove', () => {
    it('userId로 유저를 삭제한다.', async () => {
      const userId = CREATE_USER.STUB1._id.toString();
      const deleteResult = { acknowledged: true, deletedCount: 1 };
      when(mockUserRepository.findById)
        .calledWith(userId)
        .mockResolvedValue(CREATE_USER.STUB1);

      when(mockUserRepository.deleteById)
        .calledWith(userId)
        .defaultResolvedValue(deleteResult);

      expect(await userService.remove(userId)).toEqual(deleteResult);
    });

    it('삭제하려는 userId가 없으면 오류가 발생한다.', () => {
      const userId = '12345678';
      when(mockUserRepository.findById)
        .calledWith(userId)
        .defaultResolvedValue(null);

      expect(userService.remove(userId)).rejects.toEqual(
        errors.NOT_MATCHED_USER,
      );
    });
  });

  describe('updateUser', () => {
    const userStub = FULL_USER.STUB1;
    const updateUserRequest = plainToInstance(UpdateUserRequest, {
      ...userStub,
    });
    it('유저를 업데이트한다.', async () => {
      const session: SessionInfo = {
        userId: userStub._id.toString(),
        authInfo: {
          authProvider: userStub.authProvider,
          authId: userStub.authId,
        },
      };

      when(mockUserRepository.findById)
        .calledWith(session.userId)
        .mockResolvedValue(userStub);
      when(mockUserRepository.update)
        .calledWith(updateUserRequest.toEntity(session))
        .mockResolvedValue({});

      const result = await userService.updateUser(session, updateUserRequest);
      expect(result).toEqual({});
    });

    it('session에 authInfo가 없으면 오류가 발생한다.', () => {
      const session: SessionInfo = {
        userId: userStub._id.toString(),
      };

      expect(
        userService.updateUser(session, updateUserRequest),
      ).rejects.toEqual(errors.INVALID_SESSION);
    });

    it('session에 userId가 없으면 오류가 발생한다.', () => {
      const session: SessionInfo = {
        authInfo: {
          authProvider: userStub.authProvider,
          authId: userStub.authId,
        },
      };
      expect(
        userService.updateUser(session, updateUserRequest),
      ).rejects.toEqual(errors.INVALID_SESSION);
    });
  });
});
