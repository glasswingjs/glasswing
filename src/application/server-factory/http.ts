import {createServer as createHttpServer} from 'http'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer} from './_types'

export class HttpServerFactory {
  public create(router: RouterCallable): HttpOrHttpsServer {
    return createHttpServer((req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttpServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpServerFactory(),
  })
