import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

import { errors } from 'src/common/response';
import { MessageWith, User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { SendMessageRequest } from './dto/send-message.dto';
import { Content } from './entities/content.entity';
import { Message } from './entities/message.entity';
import { MessageRepository } from './message.repository';

const isHex = /^[a-f0-9]+/;

@Injectable()
export class MessageService {
  private readonly emitter: EventEmitter;

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.emitter = new EventEmitter();
  }

  async findMessageByParticipants(from: string, to: string): Promise<Message> {
    const fromUser = await this.checkUserId(from);
    const toUser = await this.checkUserId(to);

    let message = await this.messageRepository.findByParticipants(from, to);

    if (!message) {
      message = await this.messageRepository.create(from, to);

      const lastCheckTime: Date = new Date();
      fromUser.messageInfos.push(
        plainToInstance(MessageWith, { with: to, lastCheckTime }),
      );
      toUser.messageInfos.push(
        plainToInstance(MessageWith, { with: from, lastCheckTime }),
      );
      this.userRepository.updateMessageInfos(from, fromUser.messageInfos);
      this.userRepository.updateMessageInfos(to, toUser.messageInfos);
    }

    return message;
  }

  async updateContents(from: string, sendMessageRequest: SendMessageRequest) {
    const { to, content } = { ...sendMessageRequest };
    await this.checkUserId(from);
    await this.checkUserId(to);

    const message = await this.messageRepository.findByParticipants(from, to);
    const newContent: Content = plainToInstance(Content, { from, content });
    const updateContents: Content[] = [...message.contents, newContent];

    await this.messageRepository.updateByContents(from, to, updateContents);

    return true;
  }

  async checkUserId(id: string): Promise<User> {
    if (id.length < 24 || !isHex.test(id)) {
      throw errors.INVALID_ID;
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }
    return user;
  }

  subscribe(id: string) {
    return fromEvent(this.emitter, id);
  }

  async emit(id: string, data: any) {
    this.emitter.emit(id, { data });
  }
}
