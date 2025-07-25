import { forwardRef, Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramGateway } from './bot.telegramgateway';
import { BotLifecycleService } from './bot-lifecycle.service';
import { ConfigService } from '@nestjs/config';
// import { AppService } from 'src/app/app.service';
import { AppModule } from 'src/app/app.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('BOT_TOKEN')!,
      }),
    }),
    forwardRef(() => AppModule),
  ],
  controllers: [],
  providers: [BotService, BotLifecycleService, TelegramGateway],
  exports: [BotService],
})
export class BotModule {}
