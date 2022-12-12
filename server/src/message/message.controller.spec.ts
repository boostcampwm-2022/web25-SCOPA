import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageController', () => {
  const mockMessageService = {};
  const mockUserService = {};

  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
