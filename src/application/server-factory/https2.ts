import {createSecureServer as createHttps2Server} from 'http2'
import {container} from 'tsyringe'

import {Request, Response} from '../../http'
import {RouterCallable} from '../../router'
import {HttpOrHttpsServer} from './_types'
import {Http2ServerFactory} from './http2'

export class Https2ServerFactory extends Http2ServerFactory {
  public create(router: RouterCallable): HttpOrHttpsServer {
    return createHttps2Server({}, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttps2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Https2ServerFactory(),
  })
