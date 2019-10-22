import finalhandler from 'finalhandler'
import {createServer as createHttpServer, Server as HttpServer} from 'http'
import Router from 'router'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {HttpOrHttpsServer} from './index.d'

export class HttpServerFactory {
  create(router: Router): HttpOrHttpsServer {
    return createHttpServer((req: Request, res: Response) => {
      router(req, res, finalhandler(req, res))
    })
  }
}

export const registerHttpServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpServerFactory(),
  })
