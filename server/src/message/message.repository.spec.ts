import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model, Types } from 'mongoose';

import { Message, messageSchema } from './entities/message.entity';
import { Content } from './entities/content.entity';
import { MessageRepository } from './message.repository';

describe('MessageRepository', () => {
  let messageRepository: MessageRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let messageModel: Model<Message>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    messageModel = mongoConnection.model(Message.name, messageSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageRepository,
        {
          provide: getModelToken(Message.name),
          useValue: messageModel,
        },
      ],
    }).compile();

    messageRepository = module.get<MessageRepository>(MessageRepository);
  });

  let from: string;
  let to: string;
  beforeEach(async () => {
    from = new Types.ObjectId().toString();
    to = new Types.ObjectId().toString();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('MessageRepository 가 정의되어야 합니다.', () => {
    expect(messageRepository).toBeDefined();
  });

  it('Message document 생성(create)', async () => {
    const savedMessage = await messageRepository.create(from, to);

    expect(savedMessage).toHaveProperty('participants', from + ',' + to);
    to;
    expect(savedMessage).toHaveProperty('contents', []);
    expect(savedMessage).toHaveProperty('_id');
  });

  it('participants 값으로 message documnet 조회(findByParticipants)', async () => {
    const savedMessage = await messageRepository.create(from, to);

    const findMessage = await messageRepository.findByParticipants(from, to);

    expect(findMessage).toHaveProperty('_id', savedMessage._id);
    expect(findMessage).toHaveProperty(
      'participants',
      savedMessage.participants,
    );
    expect(findMessage).toHaveProperty('contents', savedMessage.contents);
  });

  it('content 추가(updateByContents)', async () => {
    const savedMessage = await messageRepository.create(from, to);
    const newContents = [
      ...savedMessage.contents,
      { from, content: '테스트용 쪽지' },
    ];

    await messageRepository.updateByContents(from, to, newContents);

    const findMessage = await messageRepository.findByParticipants(from, to);

    expect(findMessage.contents).toStrictEqual(newContents);
  });
});
