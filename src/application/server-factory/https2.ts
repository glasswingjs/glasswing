import finalhandler from 'finalhandler'
import {createSecureServer as createHttps2Server, Http2Server} from 'http2'
import Router from 'router'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {Http2ServerFactory} from './http2'
import {HttpOrHttpsServer} from './index.d'

export class Https2ServerFactory extends Http2ServerFactory {
  create(router: Router): HttpOrHttpsServer {
    return createHttps2Server((req: Request, res: Response) => {
      router(req, res, finalhandler(req, res))
    })
  }
}

export const registerHttps2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Https2ServerFactory(),
  })
