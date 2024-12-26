import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    /*Run something before request goes 
        to the route handler*/
    // console.log('I am running before reaching handler', context);

    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        /*Run something before sending data 
                to the destination*/
        return plainToInstance(this.dto, data, {
          //This setting will make sure to expose id and email field
          // that are defined in the UserDto and marked with @Expose decorator
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
