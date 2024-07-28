import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponseDto<T> {
  statusCode?: number;
  message?: string;
  data: T;
  success?: boolean | true;
  token?: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>> {

  constructor(private readonly reflector: Reflector) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponseDto<T>> {
    const customMessage = this.reflector.get<string>('customMessage', context.getHandler());
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        reqId: context.switchToHttp().getRequest().reqId,
        message: customMessage || "Operation successful",
        data: data?.accessToken ? data.result : data,//!data?.success?null:data,
        success: true,
        token: data?.accessToken
      }))
    );
  }
}