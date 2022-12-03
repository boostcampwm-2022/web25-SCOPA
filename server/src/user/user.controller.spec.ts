import { when } from 'jest-when';
import { plainToInstance } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserRequest } from './dto/create-user.dto';
import { SuccessResponse, errors } from './../common/response/index';
import { CREATE_USER } from './../test/stub';
import { SessionInfo } from 'src/d';

describe('UserController', () => {
  const mockUserService = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    validateUsername: jest.fn(),
    checkDuplicatedUsername: jest.fn(),
    remove: jest.fn(),
  };

  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('register', () => {
    const userDto = plainToInstance(CreateUserRequest, {
      username: 'abcde',
      interest: 'backend',
      techStack: ['nestjs', 'java'],
    });
    it('소셜 로그인(authInfo) 후 회원가입을 한다.', async () => {
      const authSession: SessionInfo = {
        authInfo: {
          authProvider: 'google',
          authId: '12345',
          email: 'a@gmail.com',
        },
      };
      when(mockUserService.createUser)
        .calledWith(userDto, authSession.authInfo)
        .mockResolvedValue(CREATE_USER.STUB1);

      const response = await userController.register(userDto, authSession);
      expect(response).toEqual(
        new SuccessResponse({ id: CREATE_USER.STUB1._id.toString() }),
      );
    });

    it('oauth session이 없는 유저는 오류가 발생한다.', () => {
      expect(userController.register(userDto, {})).rejects.toEqual(
        errors.NOT_OAUTH_LOGGED_IN,
      );
    });

    it('소셜 로그인(auth) 후 회원가입 시 이미 로그인한 상태(userId)라면 오류가 발생한다.', () => {
      const userSession: SessionInfo = {
        authInfo: {
          authProvider: 'google',
          authId: '12345',
          email: 'a@gmail.com',
        },
        userId: '123123123',
      };
      expect(userController.register(userDto, userSession)).rejects.toEqual(
        errors.LOGGED_IN,
      );
    });
  });

  describe('validate', () => {
    it('userId의 유효성 및 중복 검사 통과', async () => {
      const userId = 'abcde';
      mockUserService.validateUsername.mockImplementation(void 0);
      mockUserService.checkDuplicatedUsername.mockResolvedValue(void 0);

      const response = await userController.validateRegisterId(userId);
      expect(response).toEqual(new SuccessResponse());
    });
  });

  describe('withdraw', () => {
    it('정상적으로 회원 탈퇴를 합니다', async () => {
      const session: SessionInfo = {
        userId: 'abcde',
      };
      mockUserService.remove.mockResolvedValue({});

      const response = await userController.withdraw(session);
      expect(response).toEqual(new SuccessResponse());
    });

    it('로그인이 되지 않은 상태에서(세션에 userId 없이) 탈퇴 시 오류가 발생합니다.', () => {
      const session = {};
      expect(userController.withdraw(session)).rejects.toEqual(
        errors.NOT_LOGGED_IN,
      );
    });
  });
});
