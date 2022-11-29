import { when } from 'jest-when';
import { plainToInstance } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { SuccessResponse } from './../common/response/success-response';
import { errors } from 'src/common/response/error-response';

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
    const userDto = plainToInstance(CreateUserRequestDto, {
      username: 'abcde',
      interest: 'backend',
      techStack: ['nestjs', 'java'],
    });
    it('oauth session이 있는 유저를 회원가입 시킨다.', async () => {
      const authSession = {
        auth: {
          authProvider: 'google',
          authId: '12345',
          email: 'a@gmail.com',
        },
      };
      when(mockUserService.createUser)
        .calledWith(userDto, authSession.auth)
        .mockResolvedValue({});

      const response = await userController.register(userDto, authSession);
      expect(response).toEqual(new SuccessResponse());
    });

    it('oauth session이 없는 유저는 오류가 발생한다.', () => {
      expect(userController.register(userDto, {})).rejects.toEqual(
        errors.NOT_OAUTH_LOGGED_IN,
      );
    });

    it('oauth session이 있지만 로그인한 유저는 오류가 발생한다.', () => {
      const userSession = {
        auth: {
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
      const session = {
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
