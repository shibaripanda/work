import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(@InjectBot() private bot: Telegraf) {}

  async alertUserHaveAccess(userId: string) {
    await this.bot.telegram.sendMessage(
      Number(userId),
      'Выполнен вход в панель администратора',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Закрыть доступ', callback_data: 'closeAccess' }],
          ],
        },
      },
    );
  }
}
