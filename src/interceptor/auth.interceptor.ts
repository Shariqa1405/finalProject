import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (authHeader) {
      console.log('Authorization Header:', authHeader);
    } else {
      console.log('No Authorization Header Found');
    }

    return next.handle();
  }
}
