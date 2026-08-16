import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseCustomException } from '../custom-exceptions/base-custom.exception';
import { Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { formatInputValidationErrors } from '../input-validation/format-input-validation-errors';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
    constructor(private readonly i18nService: I18nService) {}
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BaseCustomException) {
      return response.status(exception.status).send({
        errors: exception.formatError(),
      });
    }

    if (exception instanceof I18nValidationException) {
      const formatedErrors = formatInputValidationErrors(
        exception.errors,
        this.i18nService,
        host,
      );
      return response.status(400).send({
        errors: formatedErrors,
      });
    }

    // unlnown exception
    response.status(500).json({
      errors: [{ message: 'Internal server error' }],
    });
  }
}
