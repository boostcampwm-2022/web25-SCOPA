import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, PaginateModel } from 'mongoose';

import { CREATE_USER } from './../test/stub';
import { UserRepository } from './user.repository';
import {
  MessageWith,
  User,
  UserDocument,
  userSchema,
} from './entities/user.entity';
import { UpdateUserRequest } from './dto/update-user.dto';
import { Condition, Pageable } from './dto/pagination';
import { Interest, TechStack } from 'src/common/enum';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: PaginateModel<User>;
  let savedUser1: User, savedUser2: User;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model<User, PaginateModel<UserDocument>>(
      User.name,
      userSchema,
      'users',
    );
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
      interest: Interest.IOS,
      techStack: [TechStack.SWIFT, TechStack.NEXTJS],
    });
    const userStub: User = {
      ...updateUserRequest,
      authProvider: savedUser1.authProvider,
      authId: savedUser1.authId,
      messages: [],
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

  it('유저 정보를 페이징 한다.', async () => {
    // beforeEach와 함께 총 11명 존재
    const ids = [];
    for (let i = 0; i < 7; i += 3) {
      // 9명 push
      ids.push(
        (
          await userModel.create({
            authProvider: 'google',
            authId: `${i}`,
            email: `${i}@gmail.com`,
            username: `${i}`,
            interest: Interest.FRONTEND,
            techStack: [TechStack.REACT, TechStack.RECOIL],
          })
        )._id.toString(),
      );
      ids.push(
        (
          await userModel.create({
            authProvider: 'github',
            authId: `${i + 1}`,
            email: `${i + 1}@gmail.com`,
            username: `${i + 1}`,
            interest: Interest.FRONTEND,
            techStack: [TechStack.JAVA, TechStack.REACT],
          })
        )._id.toString(),
      );
      ids.push(
        (
          await userModel.create({
            authProvider: 'google',
            authId: `${i + 2}`,
            email: `${i + 2}@gmail.com`,
            username: `${i + 2}`,
            interest: Interest.BACKEND,
            techStack: [TechStack.JAVA, TechStack.NEXTJS, TechStack.C_CPP],
          })
        )._id.toString(),
      );
    }
    // 총 0, 3, 6 user(3명) 검색, 3, 6 페이징
    const pages = await userRepository.findAll(
      new Condition(
        Interest.FRONTEND,
        [TechStack.RECOIL, TechStack.REACT],
        true,
        ids,
      ),
      new Pageable(2, 1),
    );
    expect(pages.totalDocs).toEqual(3);
    expect(pages.docs[0].authId).toEqual('6');
    expect(pages.docs[0].interest).toEqual(Interest.FRONTEND);
    expect(pages.docs[1].authId).toEqual('3');
    expect(pages.docs[0].techStack).toEqual([
      TechStack.REACT,
      TechStack.RECOIL,
    ]);
  });

  it('유저가 새로운 유저와의 채팅방이 생기는 걸 업데이트 합니다.', async () => {
    const IdOfUser1 = savedUser1._id.toString();
    const messages = savedUser1.messages;

    messages.push(
      plainToInstance(MessageWith, {
        with: savedUser2._id.toString(),
        lastCheckTime: new Date(),
      }),
    );

    await userRepository.updateMessages(IdOfUser1, messages);

    const result = await userRepository.findById(IdOfUser1);

    expect(result.messages).toEqual(messages);
  });
});
