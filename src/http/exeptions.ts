import {ResponseCode, ResponseMessages} from './_types'

/**
 * @link https://github.com/nestjs/nest/blob/master/packages/common/exceptions/http.exception.ts
 */
export class HttpException extends Error {
  /**
   * Convert a HTTP Exception into a HTTP body to respond with.
   * @param message
   * @param error
   * @param code
   */
  public static createBody(message: object | string, error?: string, code?: number): object {
    if (typeof message !== 'string' && !Array.isArray(message)) {
      return message
    }
    const theMessage: object = message
      ? {
          code,
          error,
          message,
        }
      : {
          code,
          error,
        }
    return theMessage
  }

  public readonly message: any

  constructor(protected readonly response: object | string, protected readonly code: number) {
    super()
    this.message = response
  }

  /**
   * Overwrite Error.toString()
   */
  public toString(): string {
    return `Error(${this.code}): ${typeof this.message === 'string' ? this.message : JSON.stringify(this.message)}`
  }
}

/**
 * 401 Unauthorized Exception
 */
export class UnauthorizedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.UNAUTHORIZED) {
    super(HttpException.createBody(message, error, ResponseCode.UNAUTHORIZED), ResponseCode.UNAUTHORIZED)
  }
}

/**
 * 402 Payment Required Exception
 */
export class PaymentRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.PAYMENT_REQUIRED) {
    super(HttpException.createBody(message, error, ResponseCode.PAYMENT_REQUIRED), ResponseCode.PAYMENT_REQUIRED)
  }
}

/**
 * 403 Forbidden Exception
 */
export class ForbiddenException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.FORBIDDEN) {
    super(HttpException.createBody(message, error, ResponseCode.FORBIDDEN), ResponseCode.FORBIDDEN)
  }
}

/**
 * 404 Not Found Exception
 */
export class NotFoundException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.NOT_FOUND) {
    super(HttpException.createBody(message, error, ResponseCode.NOT_FOUND), ResponseCode.NOT_FOUND)
  }
}

/**
 * 405 Method Not Allowed Exception
 */
export class MethodNotAllowedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.METHOD_NOT_ALLOWED) {
    super(HttpException.createBody(message, error, ResponseCode.METHOD_NOT_ALLOWED), ResponseCode.METHOD_NOT_ALLOWED)
  }
}

/**
 * 406 Not Acceptable Exception
 */
export class NotAcceptableException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.NOT_ACCEPTABLE) {
    super(HttpException.createBody(message, error, ResponseCode.NOT_ACCEPTABLE), ResponseCode.NOT_ACCEPTABLE)
  }
}

/**
 * 407 Proxy Authentication Required Exception
 */
export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.PROXY_AUTHENTICATION_REQUIRED) {
    super(
      HttpException.createBody(message, error, ResponseCode.PROXY_AUTHENTICATION_REQUIRED),
      ResponseCode.PROXY_AUTHENTICATION_REQUIRED,
    )
  }
}

/**
 * 408 Request Timeout Exception
 */
export class RequestTimeoutException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.REQUEST_TIMEOUT) {
    super(HttpException.createBody(message, error, ResponseCode.REQUEST_TIMEOUT), ResponseCode.REQUEST_TIMEOUT)
  }
}

/**
 * 409 Conflict Exception
 */
export class ConflictException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.CONFLICT) {
    super(HttpException.createBody(message, error, ResponseCode.CONFLICT), ResponseCode.CONFLICT)
  }
}

/**
 * 410 Gone Exception
 */
export class GoneException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.GONE) {
    super(HttpException.createBody(message, error, ResponseCode.GONE), ResponseCode.GONE)
  }
}

/**
 * 411 Length Required Exception
 */
export class LengthRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.LENGTH_REQUIRED) {
    super(HttpException.createBody(message, error, ResponseCode.LENGTH_REQUIRED), ResponseCode.LENGTH_REQUIRED)
  }
}

/**
 * 412 Precondition Failed Exception
 */
export class PreconditionFailedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.PRECONDITION_FAILED) {
    super(HttpException.createBody(message, error, ResponseCode.PRECONDITION_FAILED), ResponseCode.PRECONDITION_FAILED)
  }
}

/**
 * 413 Payload Too Large Exception
 */
export class PayloadTooLargeException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.PAYLOAD_TOO_LARGE) {
    super(HttpException.createBody(message, error, ResponseCode.PAYLOAD_TOO_LARGE), ResponseCode.PAYLOAD_TOO_LARGE)
  }
}

/**
 * 414 URI Too Long Exception
 */
export class URITooLongException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.URI_TOO_LONG) {
    super(HttpException.createBody(message, error, ResponseCode.URI_TOO_LONG), ResponseCode.URI_TOO_LONG)
  }
}

/**
 * 415 Unsupported Media Type Exception
 */
export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.UNSUPPORTED_MEDIA_TYPE) {
    super(
      HttpException.createBody(message, error, ResponseCode.UNSUPPORTED_MEDIA_TYPE),
      ResponseCode.UNSUPPORTED_MEDIA_TYPE,
    )
  }
}

/**
 * 416 Range Not Satisfiable Exception
 */
export class RangeNotSatisfiableException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.RANGE_NOT_SATISFIABLE) {
    super(
      HttpException.createBody(message, error, ResponseCode.RANGE_NOT_SATISFIABLE),
      ResponseCode.RANGE_NOT_SATISFIABLE,
    )
  }
}

/**
 * 417 Expectation Failed Exception
 */
export class ExpectationFailedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.EXPECTATION_FAILED) {
    super(HttpException.createBody(message, error, ResponseCode.EXPECTATION_FAILED), ResponseCode.EXPECTATION_FAILED)
  }
}

/**
 * 418 I'm a teapot Exception
 */
export class ImateapotException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.I_AM_A_TEAPOT) {
    super(HttpException.createBody(message, error, ResponseCode.I_AM_A_TEAPOT), ResponseCode.I_AM_A_TEAPOT)
  }
}

/**
 * 422 Unprocessable Entity Exception
 */
export class UnprocessableEntityException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.UNPROCESSABLE_ENTITY) {
    super(
      HttpException.createBody(message, error, ResponseCode.UNPROCESSABLE_ENTITY),
      ResponseCode.UNPROCESSABLE_ENTITY,
    )
  }
}

/**
 * 425 Too Early Exception
 */
export class TooEarlyException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.TOO_EARLY) {
    super(HttpException.createBody(message, error, ResponseCode.TOO_EARLY), ResponseCode.TOO_EARLY)
  }
}

/**
 * 426 Upgrade Required Exception
 */
export class UpgradeRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.UPGRADE_REQUIRED) {
    super(HttpException.createBody(message, error, ResponseCode.UPGRADE_REQUIRED), ResponseCode.UPGRADE_REQUIRED)
  }
}

/**
 * 428 Precondition Required Exception
 */
export class PreconditionRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.PRECONDITION_REQUIRED) {
    super(
      HttpException.createBody(message, error, ResponseCode.PRECONDITION_REQUIRED),
      ResponseCode.PRECONDITION_REQUIRED,
    )
  }
}

/**
 * 429 Too Many Requests Exception
 */
export class TooManyRequestsException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.TOO_MANY_REQUESTS) {
    super(HttpException.createBody(message, error, ResponseCode.TOO_MANY_REQUESTS), ResponseCode.TOO_MANY_REQUESTS)
  }
}

/**
 * 431 Request Header Fields Too Large Exception
 */
export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.REQUEST_HEADER_FIELDS_TOO_LARGE) {
    super(
      HttpException.createBody(message, error, ResponseCode.REQUEST_HEADER_FIELDS_TOO_LARGE),
      ResponseCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
    )
  }
}

/**
 * 451 Unavailable For Legal Reasons Exception
 */
export class UnavailableForLegalReasonsException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.UNAVAILABLE_FOR_LEGAL_REASONS) {
    super(
      HttpException.createBody(message, error, ResponseCode.UNAVAILABLE_FOR_LEGAL_REASONS),
      ResponseCode.UNAVAILABLE_FOR_LEGAL_REASONS,
    )
  }
}

/**
 * 500 Internal Server Error Exception
 */
export class InternalServerErrorException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.INTERNAL_SERVER_ERROR) {
    super(
      HttpException.createBody(message, error, ResponseCode.INTERNAL_SERVER_ERROR),
      ResponseCode.INTERNAL_SERVER_ERROR,
    )
  }
}

/**
 * 501 Not Implemented Exception
 */
export class NotImplementedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.NOT_IMPLEMENTED) {
    super(HttpException.createBody(message, error, ResponseCode.NOT_IMPLEMENTED), ResponseCode.NOT_IMPLEMENTED)
  }
}

/**
 * 502 Bad Gateway Exception
 */
export class BadGatewayException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.BAD_GATEWAY) {
    super(HttpException.createBody(message, error, ResponseCode.BAD_GATEWAY), ResponseCode.BAD_GATEWAY)
  }
}

/**
 * 503 Service Unavailable Exception
 */
export class ServiceUnavailableException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.SERVICE_UNAVAILABLE) {
    super(HttpException.createBody(message, error, ResponseCode.SERVICE_UNAVAILABLE), ResponseCode.SERVICE_UNAVAILABLE)
  }
}

/**
 * 504 Gateway Timeout Exception
 */
export class GatewayTimeoutException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.GATEWAY_TIMEOUT) {
    super(HttpException.createBody(message, error, ResponseCode.GATEWAY_TIMEOUT), ResponseCode.GATEWAY_TIMEOUT)
  }
}

/**
 * 505 HTTP Version Not Supported Exception
 */
export class HTTPVersionNotSupportedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.HTTP_VERSION_NOT_SUPPORTED) {
    super(
      HttpException.createBody(message, error, ResponseCode.HTTP_VERSION_NOT_SUPPORTED),
      ResponseCode.HTTP_VERSION_NOT_SUPPORTED,
    )
  }
}

/**
 * 506 Variant Also Negotiates Exception
 */
export class VariantAlsoNegotiatesException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.VARIANT_ALSO_NEGOTIATES) {
    super(
      HttpException.createBody(message, error, ResponseCode.VARIANT_ALSO_NEGOTIATES),
      ResponseCode.VARIANT_ALSO_NEGOTIATES,
    )
  }
}

/**
 * 507 Insufficient Storage Exception
 */
export class InsufficientStorageException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.INSUFFICIENT_STORAGE) {
    super(
      HttpException.createBody(message, error, ResponseCode.INSUFFICIENT_STORAGE),
      ResponseCode.INSUFFICIENT_STORAGE,
    )
  }
}

/**
 * 508 Loop Detected Exception
 */
export class LoopDetectedException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.LOOP_DETECTED) {
    super(HttpException.createBody(message, error, ResponseCode.LOOP_DETECTED), ResponseCode.LOOP_DETECTED)
  }
}

/**
 * 511 Network Authentication Required Exception
 */
export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(message: string | object, error: string = ResponseMessages.NETWORK_AUTHENTICATION_REQUIRED) {
    super(
      HttpException.createBody(message, error, ResponseCode.NETWORK_AUTHENTICATION_REQUIRED),
      ResponseCode.NETWORK_AUTHENTICATION_REQUIRED,
    )
  }
}
