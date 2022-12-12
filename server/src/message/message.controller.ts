import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  Sse,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { SessionInfo } from 'src/common/d';
import { errors, SuccessResponse } from 'src/common/response';
import { SendMessageRequest } from './dto/send-message.dto';
import { MessageService } from './message.service';

@Controller('/api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/send')
  async sendMessage(
    @Body() sendMessageRequest: SendMessageRequest,
    @Session() session: SessionInfo,
  ) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.messageService.updateContents(
      session.userId,
      sendMessageRequest,
    );

    const { to, content } = { ...sendMessageRequest };
    this.messageService.emit(to, {
      from: session.userId,
      content,
      time: new Date().toString(),
    });

    return new SuccessResponse();
  }

  @Sse('event')
  sendEvent(@Session() session: SessionInfo): Observable<unknown> {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    return this.messageService.subscribe(session.userId);
  }

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
