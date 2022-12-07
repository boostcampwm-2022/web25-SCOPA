import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model, Types } from 'mongoose';

import { Message, messageSchema } from './entities/message.entity';
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
    const participant1 = new Types.ObjectId().toString();
    const participant2 = new Types.ObjectId().toString();

    const savedMessage = await messageRepository.create(
      participant1,
      participant2,
    );

    expect(savedMessage).toHaveProperty(
      'participants',
      participant1 + ',' + participant2,
    );
    expect(savedMessage).toHaveProperty('contents', []);
    expect(savedMessage).toHaveProperty('_id');
  });
});
