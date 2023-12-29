// // exception.filter.ts
// import {
//   ArgumentsHost,
//   Catch,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';
// import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

// @Catch(WsException)
// export class AllWsExceptionsFilter implements BaseWsExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const { stack } = exception;
//     let message = exception.message;
//     Logger.error(JSON.stringify({ message, stack }));
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     let status: number;

//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       message =
//         JSON.parse(JSON.stringify(exception.getResponse()))?.message ??
//         exception.message;
//     } else {
//       status = HttpStatus.INTERNAL_SERVER_ERROR;
//       message = exception.details || 'Internal Server Error';
//     }

//     response.status(status ?? 500).json({
//       statusCode: status ?? 500,
//       message,
//     });
//   }
// }
