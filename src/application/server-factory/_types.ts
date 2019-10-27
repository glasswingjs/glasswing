import {Server as HttpServer, ServerOptions as HttpServerOptions} from 'http'
import {
  Http2SecureServer,
  Http2Server,
  SecureServerOptions as Https2ServerOptions,
  ServerOptions as Http2ServerOptions,
} from 'http2'
import {Server as HttpsServer, ServerOptions as HttpsServerOptions} from 'https'

import {HttpServerFactory} from './http'
import {Http2ServerFactory} from './http2'
import {HttpsServerFactory} from './https'
import {Https2ServerFactory} from './https2'

export type HttpOrHttpsServerOptions = HttpServerOptions | HttpsServerOptions | Http2ServerOptions | Https2ServerOptions

export type HttpOrHttpsServer = HttpServer | HttpsServer | Http2Server | Http2SecureServer

export type HttpOrHttpsServerFactory = HttpServerFactory | HttpsServerFactory | Http2ServerFactory | Https2ServerFactory
