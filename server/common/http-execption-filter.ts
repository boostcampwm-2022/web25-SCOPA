import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ErrorInfo } from 'src/d';
import { Request, Response } from 'express';
import { errors } from './response/error-response';

interface ErrorResponse {
  code: number;
  message: string;
}

/**
 * throw 된 것인 ErrorInfo가 아니라면 500 에러를 만든다.
 * ErrorInfo라면 해당 값을 통해 에러 객체를 생성하여 반환한다.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | ErrorInfo, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // 지정한 에러(ErrorInfo)가 아니면 모두 500 에러
    if (!(exception instanceof Array && exception.length === 3)) {
      exception = errors.INTERNER_ERROR;
    }

    const response: ErrorResponse = {
      code: exception[0],
      message: exception[1],
    };

    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
    };

    console.log(log);

    res.status(exception[2]).json(response);
  }
}
