import {Inject} from '../di'
import {Router} from '../router'
import {HttpOrHttpsServer, HttpOrHttpsServerFactory} from './server-factory'

/**
 * @see https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
 * @see https://nodejs.org/api/http.html#http_event_request
 * @see https://nodejs.org/api/https.html#https_server_listen
 * @see https://nodejs.org/api/http2.html
 * @see https://nodejs.org/api/net.html
 */

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
  protected server?: HttpOrHttpsServer

  constructor(
    // @Inject('Config') protected config: Config
    @Inject('ServerFactory') protected serverFactory: HttpOrHttpsServerFactory,
    @Inject('Router') protected router: Router,
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
    // this.mapRoutes()
    this.server = this.serverFactory.create(this.router)
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
    return new Promise((resolve, reject) => {
      if (!this.server) {
        throw new Error('There is no server to stop. Please use .start() method first.')
      }
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
        this.server!.listen(this.port, this.host)
      } else {
        this.server!.listen(this.port)
      }

      this.server!.on('error', (err: HttpServerListenError) => {
        this.server!.close()
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
