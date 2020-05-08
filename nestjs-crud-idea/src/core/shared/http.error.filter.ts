import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();

        response.status(404).json({found: false});
    }
}