import {createServer as createHttpsServer} from 'https'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer} from './_types'
import {HttpServerFactory} from './http'

export class HttpsServerFactory extends HttpServerFactory {
  public create(router: RouterCallable): HttpOrHttpsServer {
    return createHttpsServer((req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttpsServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpsServerFactory(),
  })
