import {createServer as createHttpServer, Server as HttpServer} from 'http'
import {createSecureServer as createHttps2Server, createServer as createHttp2Server, Http2Server} from 'http2'
import {createServer as createHttpsServer, Server as HttpsServer} from 'https'
import {container} from 'tsyringe'

import {Inject} from '../di'

export type HttpOrHttpsServer = HttpServer | HttpsServer | Http2Server

export type XFunction = (...args: any[]) => any

// import {Config} from '../config'
// import {Controller} from '../controller'
// import {Inject} from '../di'
// import {NextXFunction} from './server'

/**
 * @see https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
 * @see https://nodejs.org/api/http.html#http_event_request
 * @see https://nodejs.org/api/https.html#https_server_listen
 * @see https://nodejs.org/api/http2.html
 * @see https://nodejs.org/api/net.html
 */

export const registerHttpServer = () =>
  container.register('Server', {
    useFactory: () => createHttpServer(),
  })

export const registerHttpsServer = () =>
  container.register('Server', {
    useFactory: () => createHttpsServer(),
  })

export const registerHttp2Server = () =>
  container.register('Server', {
    useFactory: () => createHttp2Server(),
  })

export const registerHttps2Server = () =>
  container.register('Server', {
    useFactory: () => createHttps2Server(),
  })

export interface HttpServerListenError extends Error {
  code?: string
}

export interface IApplication {
  // resetControllers(): void
  // registerController(controller: Controller): void
  // registerControllers(controllers: Controller[]): void
  // registeredControllers(): Controller[]
  start(port?: number, host?: string): void | Promise<void>
  stop(): void | Promise<void>
}

export class Application implements IApplication {
  protected port: number = 3000
  protected host?: string
  protected retries: number = 1
  protected retriesMax: number = 10

  constructor(
    // @Inject('Config') protected config: Config
    @Inject('Server') protected server: HttpOrHttpsServer,
  ) {}

  /**
   *
   * @param {number} port
   * @param {string} host
   * @returns {Promise<void>}
   */
  public async start(port: number = 3000, host?: string): Promise<void> {
    this.retries = 1
    this.port = 3000
    this.host = host
    await this.tryStart()

    // @link https://nodejs.org/api/http.html#http_event_clienterror
    // this.server.on('clientError', (err, socket) => {
    //   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    // });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public async stop(): Promise<void> {
    return new Promise((resolve: XFunction, reject: XFunction) => {
      this.server.close((err?: Error | undefined) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  protected tryStart(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.host) {
        this.server.listen(this.port, this.host)
      } else {
        this.server.listen(this.port)
      }

      this.server.on('error', (err: HttpServerListenError) => {
        this.server.close()
        if (err.code !== 'EADDRINUSE') {
          reject(err)
        } else {
          // TODO: Add fail log
          console.log(`Server failed starting on port: ${this.port}. Port is busy.`) // tslint:disable-line no-console
          if (this.retries++ < this.retriesMax) {
            // TODO: Add retry log
            this.port += 1
            console.log(`Retrying with port: ${this.port}.`) // tslint:disable-line no-console
            setTimeout(() => resolve(this.tryStart()), 500)
          } else {
            // TODO: Add fail log
            console.error(`Max retries exceeded.`) // tslint:disable-line no-console
            reject(err)
          }
        }
      })
    })
  }
}

// export interface NextXFunction {
//   // tslint:disable-next-line callable-types (In ts2.1 it thinks the type alias has no call signatures)
//   (err?: any): void
// }

// export interface Server {
//   resetControllers(): void
//   registerController(controller: Controller): void
//   registerControllers(controllers: Controller[]): void
//   registeredControllers(): Controller[]
//   start(): void | Promise<void>
//   stop(): void | Promise<void>
// }

// export abstract class AbstractServer implements Server {
//   protected controllers: Controller[] = []

//   /**
//    *
//    * @param {Config} config
//    */
//   constructor(@Inject('Config') protected config: Config) {}

//   public resetControllers(): void {
//     this.controllers = []
//   }

//   public registerController(controller: Controller): void {
//     this.controllers.push(controller)
//   }

//   public registerControllers(controllers: Controller[]): void {
//     controllers.forEach(controller => this.registerController(controller))
//   }

//   public registeredControllers(): Controller[] {
//     return this.controllers
//   }

//   public async start(): Promise<void> {
//     await this.startServer(
//       this.config.get('server.port') as number, //,
//       // this.config.get('server.options') || {}
//     )
//     process.on('SIGINT', () => {
//       // TODO: Add fail log
//       console.log('SIGINT received. Attempting closure.')
//       this.stop()
//     })
//   }

//   public abstract stop(): Promise<void>

//   protected abstract startServer(port: number, options?: {[key: string]: any}): Promise<void>
// }
