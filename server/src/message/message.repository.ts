import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(participant1: string, participant2: string): Promise<Message> {
    const sortedParticipants = [participant1, participant2].sort();
    const participants = sortedParticipants[0] + ',' + sortedParticipants[1];

    return await this.messageModel.create({ participants, contents: [] });
  }
}
