import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Message, MessageDocument } from './entities/message.entity';
import { Content } from './entities/content.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(from: string, to: string): Promise<Message> {
    const participants = this.sortParticipants(from, to);

    return await this.messageModel.create({ participants, contents: [] });
  }

  async findByParticipants(from: string, to: string): Promise<Message> {
    const participants = this.sortParticipants(from, to);

    return await this.messageModel
      .findOne()
      .where('participants')
      .equals(participants);
  }

  async updateByContents(from: string, to: string, contents: Content[]) {
    const participants = this.sortParticipants(from, to);

    return await this.messageModel.updateOne(
      { participants },
      { $set: { contents } },
    );
  }

  sortParticipants(from: string, to: string): string {
    const sortedParticipants = [from, to].sort();
    const participants = sortedParticipants[0] + ',' + sortedParticipants[1];

    return participants;
  }
}
