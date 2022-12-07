import { Injectable } from '@nestjs/common';

import { errors } from 'src/common/response';
import { UserRepository } from 'src/user/user.repository';
import { MessageRepository } from './message.repository';

const isHex = /^[a-f0-9]+/;

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findMessageByParticipants(from: string, to: string) {
    await this.checkUserId(from);
    await this.checkUserId(to);

    let message = await this.messageRepository.findByParticipants(from, to);

    if (!message) {
      message = await this.messageRepository.create(from, to);
    }

    return message;
  }

  async checkUserId(id: string): Promise<void> {
    if (id.length < 24 || !isHex.test(id)) {
      throw errors.INVALID_ID;
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }
  }
}
