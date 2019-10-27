import {createSecureServer as createHttps2Server, SecureServerOptions} from 'http2'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer, HttpOrHttpsServerOptions} from './_types'
import {Http2ServerFactory} from './http2'

export class Https2ServerFactory extends Http2ServerFactory {
  public create(router: RouterCallable, options: HttpOrHttpsServerOptions = {}): HttpOrHttpsServer {
    return createHttps2Server(options as SecureServerOptions, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttps2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Https2ServerFactory(),
  })
