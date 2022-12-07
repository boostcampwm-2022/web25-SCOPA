import { Controller, Get, Param, Session } from '@nestjs/common';
import { SessionInfo } from 'src/common/d';
import { errors, SuccessResponse } from 'src/common/response';

import { MessageService } from './message.service';

@Controller('/api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/:to')
  async findMessage(@Param('to') to: string, @Session() session: SessionInfo) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    const message = await this.messageService.findMessageByParticipants(
      session.userId,
      to,
    );

    return new SuccessResponse(message.contents);
  }
}
