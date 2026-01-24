import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs';
const LokiTransport = require('winston-loki');

@Injectable()
export class MyLoggerService implements LoggerService {
  private logger: Logger;
  constructor() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const transportOptions = {
      file: new DailyRotateFile({
        filename: path.join(logDir, 'application-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        auditFile: path.join(logDir, 'audit.json'),
        format: format.combine(format.timestamp(), format.json()),
      }),
      console: new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(({ timestamp, level, message, context }) => {
            return `${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message}`;
          }),
        ),
      }),
      loki: new LokiTransport({
        host: process.env.DEV_GR_HOST,
        basicAuth: process.env.DEV_GR_API_KEY,
        labels: { app: 'nest_app', env: 'development', server: 'nest_server' },
        json: true,
        format: format.json(),
        replaceTimestamp: true,
        onConnectionError: (err) => console.error('Loki Error:', err),
      }),
    };
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [
        transportOptions.file,
        transportOptions.console,
        transportOptions.loki,
      ],
      exceptionHandlers: [
        transportOptions.file,
        transportOptions.console,
        transportOptions.loki,
      ],
      exitOnError: false,
    });
  }
  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
