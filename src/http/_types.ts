import {IncomingMessage, RequestListener as HttpRequestHandler, ServerResponse} from 'http'
import {Http2ServerRequest, Http2ServerResponse} from 'http2'

export type Response = ServerResponse | Http2ServerResponse

export type Request = IncomingMessage | Http2ServerRequest

export type CommonRequestHandler = (req: Request, res: Response) => void

export type RequestHandler = HttpRequestHandler | CommonRequestHandler

/**
 * List of HTTP headers, as described on MDN Documentation
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */
export enum Header {
  ACCEPT = 'Accept',
  ACCEPT_CH = 'Accept-CH',
  ACCEPT_CH_LIFETIME = 'Accept-CH-Lifetime',
  ACCEPT_CHARSET = 'Accept-Charset',
  ACCEPT_ENCODING = 'Accept-Encoding',
  ACCEPT_LANGUAGE = 'Accept-Language',
  ACCEPT_PATCH = 'Accept-Patch',
  ACCEPT_RANGES = 'Accept-Ranges',
  ACCESS_CONTROL_ALLOW_CREDENTIALS = 'Access-Control-Allow-Credentials',
  ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
  ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
  ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
  ACCESS_CONTROL_EXPOSE_HEADERS = 'Access-Control-Expose-Headers',
  ACCESS_CONTROL_MAX_AGE = 'Access-Control-Max-Age',
  ACCESS_CONTROL_REQUEST_HEADERS = 'Access-Control-Request-Headers',
  ACCESS_CONTROL_REQUEST_METHOD = 'Access-Control-Request-Method',
  AGE = 'Age',
  ALLOW = 'Allow',
  ALT_SVC = 'Alt-Svc',
  AUTHORIZATION = 'Authorization',
  CACHE_CONTROL = 'Cache-Control',
  CLEAR_SITE_DATA = 'Clear-Site-Data',
  CONNECTION = 'Connection',
  CONTENT_DISPOSITION = 'Content-Disposition',
  CONTENT_ENCODING = 'Content-Encoding',
  CONTENT_LANGUAGE = 'Content-Language',
  CONTENT_LENGTH = 'Content-Length',
  CONTENT_LOCATION = 'Content-Location',
  CONTENT_RANGE = 'Content-Range',
  CONTENT_SECURITY_POLICY = 'Content-Security-Policy',
  CONTENT_SECURITY_POLICY_REPORT_ONLY = 'Content-Security-Policy-Report-Only',
  CONTENT_TYPE = 'Content-Type',
  COOKIE = 'Cookie',
  COOKIE2 = 'Cookie2',
  CROSS_ORIGIN_RESOURCE_POLICY = 'Cross-Origin-Resource-Policy',
  DNT = 'DNT',
  DPR = 'DPR',
  DATE = 'Date',
  DEVICE_MEMORY = 'Device-Memory',
  DIGEST = 'Digest',
  ETAG = 'ETag',
  EARLY_DATA = 'Early-Data',
  EXPECT = 'Expect',
  EXPECT_CT = 'Expect-CT',
  EXPIRES = 'Expires',
  FEATURE_POLICY = 'Feature-Policy',
  FORWARDED = 'Forwarded',
  FROM = 'From',
  HOST = 'Host',
  IF_MATCH = 'If-Match',
  IF_MODIFIED_SINCE = 'If-Modified-Since',
  IF_NONE_MATCH = 'If-None-Match',
  IF_RANGE = 'If-Range',
  IF_UNMODIFIED_SINCE = 'If-Unmodified-Since',
  INDEX = 'Index',
  KEEP_ALIVE = 'Keep-Alive',
  LARGE_ALLOCATION = 'Large-Allocation',
  LAST_MODIFIED = 'Last-Modified',
  LINK = 'Link',
  LOCATION = 'Location',
  ORIGIN = 'Origin',
  PRAGMA = 'Pragma',
  PROXY_AUTHENTICATE = 'Proxy-Authenticate',
  PROXY_AUTHORIZATION = 'Proxy-Authorization',
  PUBLIC_KEY_PINS = 'Public-Key-Pins',
  PUBLIC_KEY_PINS_REPORT_ONLY = 'Public-Key-Pins-Report-Only',
  RANGE = 'Range',
  REFERER = 'Referer',
  REFERRER_POLICY = 'Referrer-Policy',
  RETRY_AFTER = 'Retry-After',
  SAVE_DATA = 'Save-Data',
  SEC_WEBSOCKET_ACCEPT = 'Sec-WebSocket-Accept',
  SERVER = 'Server',
  SERVER_TIMING = 'Server-Timing',
  SET_COOKIE = 'Set-Cookie',
  SET_COOKIE2 = 'Set-Cookie2',
  SOURCEMAP = 'SourceMap',
  STRICT_TRANSPORT_SECURITY = 'Strict-Transport-Security',
  TE = 'TE',
  TIMING_ALLOW_ORIGIN = 'Timing-Allow-Origin',
  TK = 'Tk',
  TRAILER = 'Trailer',
  TRANSFER_ENCODING = 'Transfer-Encoding',
  UPGRADE_INSECURE_REQUESTS = 'Upgrade-Insecure-Requests',
  USER_AGENT = 'User-Agent',
  VARY = 'Vary',
  VIA = 'Via',
  WWW_AUTHENTICATE = 'WWW-Authenticate',
  WANT_DIGEST = 'Want-Digest',
  WARNING = 'Warning',
  X_CONTENT_TYPE_OPTIONS = 'X-Content-Type-Options',
  X_DNS_PREFETCH_CONTROL = 'X-DNS-Prefetch-Control',
  X_FORWARDED_FOR = 'X-Forwarded-For',
  X_FORWARDED_HOST = 'X-Forwarded-Host',
  X_FORWARDED_PROTO = 'X-Forwarded-Proto',
  X_FRAME_OPTIONS = 'X-Frame-Options',
  X_XSS_PROTECTION = 'X-XSS-Protection',
}

/**
 * List of HTTP Resonse Codes as described on MDN Documentation
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export enum ResponseCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102, // RFC2518
  EARLY_HINTS = 103, // RFC8297
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207, // RFC4918
  ALREADY_REPORTED = 208, // RFC5842
  IM_USED = 226, // RFC3229
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  RESERVED = 306,
  TEMPORARY_REDIRECT = 307,
  PERMANENTLY_REDIRECT = 308, // RFC7238
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_ENTITY_TOO_LARGE = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418, // RFC2324
  MISDIRECTED_REQUEST = 421, // RFC7540
  UNPROCESSABLE_ENTITY = 422, // RFC4918
  LOCKED = 423, // RFC4918
  FAILED_DEPENDENCY = 424, // RFC4918
  TOO_EARLY = 425, // RFC-ietf-httpbis-replay-04
  UPGRADE_REQUIRED = 426, // RFC2817
  PRECONDITION_REQUIRED = 428, // RFC6585
  TOO_MANY_REQUESTS = 429, // RFC6585
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // RFC6585
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506, // RFC2295
  INSUFFICIENT_STORAGE = 507, // RFC4918
  LOOP_DETECTED = 508, // RFC5842
  NOT_EXTENDED = 510, // RFC2774
  NETWORK_AUTHENTICATION_REQUIRED = 511, // RFC6585
}

/**
 * List of Request Methods as described on MDN Documentation
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export enum RequestMethod {
  ALL = 'all',
  /**
   * The CONNECT method establishes a tunnel to the server identified by the target  resource.
   */
  CONNECT = 'connect',
  /**
   * The DELETE method deletes the specified resource.
   */
  DELETE = 'delete',
  /**
   * The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
   */
  GET = 'get',
  /**
   * The HEAD method asks for a response identical to that of a GET request, but without the response body.
   */
  HEAD = 'head',
  /**
   * The OPTIONS method is used to describe the communication options for the target resource.
   */
  OPTIONS = 'options',
  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  PATCH = 'patch',
  /**
   * The POST method is used to submit an entity to the specified resource, often causing a change in state or side
   * effects on the server.
   */
  POST = 'post',
  /**
   * @link https://github.com/symfony/http-foundation/blob/master/Request.php
   */
  PURGE = 'purge',
  /**
   * The PUT method replaces all current representations of the target resource with the request payload.
   */
  PUT = 'put',
  /**
   * The TRACE method performs a message loop-back test along the path to the target resource.
   */
  TRACE = 'trace',
}
