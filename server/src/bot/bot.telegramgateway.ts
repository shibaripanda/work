import { BotService } from './bot.service';
import { Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { AppService } from 'src/app/app.service';
import { Context } from 'telegraf';

@Update()
export class TelegramGateway {
  constructor(
    private botService: BotService,
    private appService: AppService,
  ) {}

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('get hi');
  }

  @On('photo')
  async addNewOrderImages(@Ctx() ctx: Context) {
    await ctx.reply('get photo');
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('get start');
  }

  @Command('enter')
  async getAuthLink(@Ctx() ctx: Context) {
    if (ctx && ctx.from) {
      await ctx.reply(this.appService.getAuthLink(ctx.from.id));
    }
  }
}
