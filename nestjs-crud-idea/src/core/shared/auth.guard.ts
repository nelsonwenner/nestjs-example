import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';


@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
 
    if(!request.headers.authorization) {
        return false;
    }
    const data = await this.validateToken(request.headers.authorization);
    request.user = data;
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalide token', HttpStatus.FORBIDDEN);
    }

    const token = auth.split(' ')[1];

    try {
        return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
        const message = 'Token error: ' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
