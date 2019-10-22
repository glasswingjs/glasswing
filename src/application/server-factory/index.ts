import {Server as HttpsServer} from 'https'
import {Server as HttpServer} from 'http'
import {Http2Server} from 'http2'

import {HttpServerFactory, registerHttpServerFactory} from './http'
import {HttpsServerFactory, registerHttpsServerFactory} from './https'
import {Http2ServerFactory, registerHttp2ServerFactory} from './http2'
import {Https2ServerFactory, registerHttps2ServerFactory} from './https2'

export {
  HttpServerFactory,
  HttpsServerFactory,
  Http2ServerFactory,
  Https2ServerFactory,
  registerHttpServerFactory,
  registerHttpsServerFactory,
  registerHttp2ServerFactory,
  registerHttps2ServerFactory,
}

export type HttpOrHttpsServer = HttpServer | HttpsServer | Http2Server

export type HttpOrHttpsServerFactory = HttpServerFactory | HttpsServerFactory | Http2ServerFactory | Https2ServerFactory
