import { Injectable,HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
    async healthCheck(): Promise<object> {
        return { status: HttpStatus.OK };
      }
}