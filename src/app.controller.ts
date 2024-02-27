import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express'
import { ApiOkResponse } from '@nestjs/swagger'
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {

    constructor(private appService: AppService) { }

    @Get('/.well-known/pki-validation/60E7D2F846A6A224F1BADCC2A9D88C56.txt')
    async giveCertificateData(@Res() res: Response) {
        try {
            const file = fs.readFileSync('/home/ubuntu/Backend/src/F894B5F937FBF4E7BEA92EDCFB4A9E96.txt');
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', 'attachment; filename=F894B5F937FBF4E7BEA92EDCFB4A9E96.txt');
            res.send(file);
        } catch (error) {
            console.log("error", error);
            res.status(500).send('Internal Server Error');
        }
    }

    @Get('/testcicd')
    testcicd(@Res() res: Response) {
        res.status(200).json({ data: 'Version 5 testing CI/CD' });
    }

    @Get()
    @ApiOkResponse({ description: 'checks health of app' })
    healthCheck(): Promise<object> {
        return this.appService.healthCheck();
    }
}