import finalhandler from 'finalhandler'
import {createServer as createHttpsServer, Server as HttpsServer} from 'https'
import Router from 'router'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {HttpServerFactory} from './http'
import {HttpOrHttpsServer} from './index.d'

export class HttpsServerFactory extends HttpServerFactory {
  create(router: Router): HttpOrHttpsServer {
    return createHttpsServer((req: Request, res: Response) => {
      router(req, res, finalhandler(req, res))
    })
  }
}

export const registerHttpsServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpsServerFactory(),
  })
