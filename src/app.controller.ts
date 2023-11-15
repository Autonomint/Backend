import { Controller,Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger'
import { AppService } from './app.service';

@Controller()
export class AppController {

    constructor(private appService:AppService){}
    /**
    * @description api to check status of platform
    * @returns Httpstatus 200 OK response
    * This is to check health of app
    */
    @Get()
    @ApiOkResponse({ description: 'checks health of app' })
    healthCheck(): Promise<object> {
        return this.appService.healthCheck();
    }
}