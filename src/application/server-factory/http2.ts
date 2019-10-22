import finalhandler from 'finalhandler'
import {createServer as createHttp2Server, Http2Server} from 'http2'
import Router from 'router'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {HttpServerFactory} from './http'
import {HttpOrHttpsServer} from './index.d'

export class Http2ServerFactory extends HttpServerFactory {
  create(router: Router): HttpOrHttpsServer {
    return createHttp2Server((req: Request, res: Response) => {
      router(req, res, finalhandler(req, res))
    })
  }
}

export const registerHttp2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Http2ServerFactory(),
  })
