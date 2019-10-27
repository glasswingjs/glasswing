import {Server as HttpServer} from 'http'
import {Http2SecureServer, Http2Server} from 'http2'
import {Server as HttpsServer} from 'https'

import {HttpServerFactory} from './http'
import {Http2ServerFactory} from './http2'
import {HttpsServerFactory} from './https'
import {Https2ServerFactory} from './https2'

export type HttpOrHttpsServer = HttpServer | HttpsServer | Http2Server | Http2SecureServer

export type HttpOrHttpsServerFactory = HttpServerFactory | HttpsServerFactory | Http2ServerFactory | Https2ServerFactory
