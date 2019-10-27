import {createServer as createHttpsServer, ServerOptions} from 'https'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer, HttpOrHttpsServerOptions} from './_types'
import {HttpServerFactory} from './http'

export class HttpsServerFactory extends HttpServerFactory {
  public create(router: RouterCallable, options: HttpOrHttpsServerOptions = {}): HttpOrHttpsServer {
    return createHttpsServer(options as ServerOptions, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttpsServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpsServerFactory(),
  })
