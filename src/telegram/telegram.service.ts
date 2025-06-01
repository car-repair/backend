import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Booking } from '../booking/entities/booking.entity';
import { DateTime } from 'luxon';

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);
    private readonly botToken?: string;
    private readonly chatId?: string;
    private readonly telegramApiUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
        this.telegramApiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

        if (!this.botToken || !this.chatId) {
            this.logger.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing. Notifications will be skipped.');
        }
    }

    async sendBookingNotification(booking: Booking): Promise<void> {
        if (!this.botToken || !this.chatId) {
            this.logger.warn('Skipping Telegram notification due to missing configuration.');
            return;
        }

        const startsAt = DateTime.fromJSDate(booking.startsAt, { zone: 'Asia/Yekaterinburg' }).toFormat('dd.MM.yyyy HH:mm');
        const services = booking.services.map((s) => s.name).join(', ');
        const message = `
            <b>Новое бронирование</b>
            <b>Клиент:</b> ${booking.firstname} ${booking.lastname}
            <b>Телефон:</b> ${booking.phone}
            <b>Авто:</b> ${booking.car.brand.name} ${booking.car.model.name}
            <b>Услуги:</b> ${services}
            <b>Начало:</b> ${startsAt}
            <b>Комментарий:</b> ${booking.comment || 'Нет'}
            `.trim();

        try {
            await axios.get(this.telegramApiUrl, {
                params: {
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML',
                },
            });
            //this.logger.log(`Telegram notification sent for booking ID: ${booking.id}`);
        } catch (error) {
            this.logger.error('Failed to send Telegram notification:', error.message);
        }
    }
}