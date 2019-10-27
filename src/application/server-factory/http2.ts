import {createServer as createHttp2Server} from 'http2'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer} from './_types'
import {HttpServerFactory} from './http'

export class Http2ServerFactory extends HttpServerFactory {
  public create(router: RouterCallable): HttpOrHttpsServer {
    return createHttp2Server((req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttp2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Http2ServerFactory(),
  })
