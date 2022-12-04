import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { CREATE_USER } from './../test/stub';
import { UserRepository } from './user.repository';
import { User, userSchema } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserRequest } from './dto/update-user.dto';

describe('UserRepository', () => {
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
    savedUser1 = await userRepository.create(CREATE_USER.STUB1);
    savedUser2 = await userRepository.create(CREATE_USER.STUB2);
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
    const savedUser = await userRepository.create(CREATE_USER.STUB3);

    expect(savedUser).toHaveProperty(
      'authProvider',
      CREATE_USER.STUB3.authProvider,
    );
    expect(savedUser).toHaveProperty('authId', CREATE_USER.STUB3.authId);
    expect(savedUser).toHaveProperty('email', CREATE_USER.STUB3.email);
    expect(savedUser).toHaveProperty('username', CREATE_USER.STUB3.username);
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser).toHaveProperty('createdAt');
    expect(savedUser).toHaveProperty('updatedAt');
  });

  it('authProvider와 authId로 user1 찾기', async () => {
    const findUser = await userRepository.findByAuthProviderAndAuthId(
      CREATE_USER.STUB1.authProvider,
      CREATE_USER.STUB1.authId,
    );

    expect(findUser).toHaveProperty('_id', savedUser1._id);
    expect(findUser).toHaveProperty('authProvider', savedUser1.authProvider);
    expect(findUser).toHaveProperty('authId', savedUser1.authId);
  });

  it('username으로 user1 찾기', async () => {
    const user = await userRepository.findByUsername(
      CREATE_USER.STUB1.username,
    );

    expect(user).toHaveProperty('_id', savedUser1._id);
    expect(user).toHaveProperty('username', CREATE_USER.STUB1.username);
  });

  it('id로 user1 찾기', async () => {
    const user = await userRepository.findById(savedUser1._id.toString());

    expect(user).toHaveProperty('_id', savedUser1._id);
  });

  it('id로 user1 삭제', async () => {
    const user1Id = savedUser1._id.toString();
    await userRepository.deleteById(user1Id);

    const user = await userRepository.findById(user1Id);
    expect(user).toBeNull();
  });

  it('user1을 userStub의 데이터로 업데이트', async () => {
    const updateUserRequest = plainToInstance(UpdateUserRequest, {
      email: 'qpqpqp@gmail.com',
      username: 'qpqpqp',
      interest: 'iOS',
      techStack: ['swift', 'nestjs'],
    });
    const userStub: User = {
      ...updateUserRequest,
      authProvider: savedUser1.authProvider,
      authId: savedUser1.authId,
      _id: savedUser1._id,
      createdAt: '',
      updatedAt: '',
    };
    const updatedObject = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1,
    };
    const result = await userRepository.update(userStub);
    expect(result).toEqual(updatedObject);

    const updatedUser = await userRepository.findById(
      savedUser1._id.toString(),
    );
    expect(updatedUser._id).toEqual(savedUser1._id);
    expect(updatedUser).toEqual(expect.objectContaining(updateUserRequest));
    expect(updatedUser.code).toBeUndefined();
  });
});
