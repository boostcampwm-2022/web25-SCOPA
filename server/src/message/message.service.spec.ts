import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { Types } from 'mongoose';

import { UserRepository } from 'src/user/user.repository';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

describe('MessageService', () => {
  const mockMessageRepository = {
    findByParticipants: jest.fn(),
    create: jest.fn(),
  };
  const mockUserRepository = {
    findById: jest.fn(),
    updateMessageInfos: jest.fn(),
  };

  let messageService: MessageService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: MessageRepository, useValue: mockMessageRepository },
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('MessageService 가 정의되어야 합니다.', () => {
    expect(messageService).toBeDefined();
  });

  describe('findMessageByParticipants 메소드 테스트', () => {
    it('from, to 에 맞는 Message document 가 있는 경우', async () => {
      const from = new Types.ObjectId().toString();
      const to = new Types.ObjectId().toString();
      const message = {
        _id: new Types.ObjectId(),
        participants: from + ',' + to,
        contents: [],
      };

      mockUserRepository.findById.mockResolvedValue({});

      when(mockMessageRepository.findByParticipants)
        .calledWith(from, to)
        .mockResolvedValue(message);

      const result = await messageService.findMessageByParticipants(from, to);

      expect(result).toEqual(message);
      expect(mockMessageRepository.findByParticipants).toBeCalledTimes(1);
    });

    it('from, to 에 맞는 Message document 가 없는 경우', async () => {
      const from = new Types.ObjectId().toString();
      const to = new Types.ObjectId().toString();
      const message = {
        _id: new Types.ObjectId(),
        participants: from + ',' + to,
        contents: [],
      };

      mockUserRepository.findById.mockResolvedValue({ messageInfos: [] });

      when(mockMessageRepository.findByParticipants)
        .calledWith(from, to)
        .mockResolvedValue(null);

      when(mockMessageRepository.create)
        .calledWith(from, to)
        .mockResolvedValue(message);

      const result = await messageService.findMessageByParticipants(from, to);

      expect(result).toEqual(message);
      expect(mockMessageRepository.findByParticipants).toBeCalledTimes(1);
      expect(mockUserRepository.updateMessageInfos).toBeCalledTimes(2);
    });
  });
});
