import { Controller, ForbiddenException, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  handleToken1() {
    console.log('Test');
  }

  @Get('access/:token')
  async checkToken(@Param('token') token: string) {
    const data = await this.appService.validateToken(token);
    if (!data) {
      console.log('Close');
      throw new ForbiddenException('Недействительный токен');
    }
    console.log('Open');
    return { token: data };
  }
}
