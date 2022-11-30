import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model, Types } from 'mongoose';

import { UserRepository } from './user.repository';
import { User, userSchema } from './entities/user.entity';

describe('UserRepository', () => {
  const userStub1: User = {
    authProvider: 'google',
    authId: '1111',
    email: 'aa@gmail.com',
    username: 'user1',
    _id: new Types.ObjectId('637f8ec80b9f9e762f47c269'),
    createdAt: '',
    updatedAt: '',
  };

  const userStub2: User = {
    authProvider: 'github',
    authId: '2222',
    email: 'bb@gmail.com',
    username: 'user2',
    _id: new Types.ObjectId('637f8ec80b9f9e762f471111'),
    createdAt: '',
    updatedAt: '',
  };

  let userRepository: UserRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let savedUser1: User, savedUser2: User;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, userSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    savedUser1 = await userRepository.create(userStub1);
    savedUser2 = await userRepository.create(userStub2);
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

  it('유저 생성', async () => {
    const user: User = {
      authProvider: 'github',
      authId: '3333',
      email: 'cc@gmail.com',
      username: 'user3',
      _id: new Types.ObjectId(),
      createdAt: '',
      updatedAt: '',
    };

    const savedUser = await userRepository.create(user);

    expect(savedUser).toHaveProperty('authProvider', user.authProvider);
    expect(savedUser).toHaveProperty('authId', user.authId);
    expect(savedUser).toHaveProperty('email', user.email);
    expect(savedUser).toHaveProperty('username', user.username);
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser).toHaveProperty('createdAt');
    expect(savedUser).toHaveProperty('updatedAt');
  });

  it('모든 유저 찾기', async () => {
    const users = await userRepository.findAll();

    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty('_id', savedUser1._id);
    expect(users[1]).toHaveProperty('_id', savedUser2._id);
  });

  it('authProvider와 authId로 user1 찾기', async () => {
    const user = await userRepository.findUserByAuthProviderAndAuthId(
      'google',
      '1111',
    );

    expect(user).toHaveProperty('_id', savedUser1._id);
    expect(user).toHaveProperty('authProvider', userStub1.authProvider);
    expect(user).toHaveProperty('authId', userStub1.authId);
  });

  it('username으로 user1 찾기', async () => {
    const user = await userRepository.findUserByUsername('user1');

    expect(user).toHaveProperty('_id', savedUser1._id);
    expect(user).toHaveProperty('username', userStub1.username);
  });

  it('id로 user1 찾기', async () => {
    const user = await userRepository.findUserById(savedUser1._id.toString());

    expect(user).toHaveProperty('_id', savedUser1._id);
  });

  it('id로 user1 삭제', async () => {
    const user1Id = savedUser1._id.toString();
    await userRepository.deleteById(user1Id);

    const user = await userRepository.findUserById(user1Id);
    expect(user).toBeNull();
  });
});
