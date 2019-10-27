import 'reflect-metadata'
import {AbstractController} from '../controller'
import {Inject, Injectable} from '../di'
import {Route, RouteRegistry} from '../route'
import {Router, RouterCallable} from '../router'
import {HttpOrHttpsServer, HttpOrHttpsServerFactory, HttpServerListenError} from './server-factory'

@Injectable()
export class Application {
  protected port: number = 3000
  protected host?: string
  protected retries: number = 1
  protected retriesMax: number = 10
  protected server?: HttpOrHttpsServer

  constructor(
    // @Inject('Config') protected config: Config
    @Inject('ServerFactory') protected serverFactory: HttpOrHttpsServerFactory,
    @Inject('Router') protected router: Router,
    @Inject(RouteRegistry) protected routeRegistry: RouteRegistry,
  ) {}

  /**
   * Register a controller to the application
   * @param controller
   */
  public registerController(controller: AbstractController): void {
    // for now it's enough to store the routes; we'll see what future reserves
    const crs = Reflect.getMetadata('routeRegistry', controller) as RouteRegistry
    crs.routes.forEach((route: Route) => this.routeRegistry.registerRoute(route))
  }

  /**
   * Register a set of controllers to the application
   * @param controllers
   */
  public registerControllers(controllers: AbstractController[]): void {
    controllers.forEach((controller: AbstractController) => this.registerController(controller))
  }

  /**
   * Obtain the list of application registered routes
   */
  public registeredRoutes(): Route[] {
    return this.routeRegistry.routes
  }

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

    this.server = this.serverFactory.create((this.router as any) as RouterCallable) // TODO: better way to do this ?

    await this.tryStart()

    // TODO: Add error for this
    // @link https://nodejs.org/api/http.html#http_event_clienterror
    this.server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })
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
        // TODO: Add fail log
        console.log(`Starting application on ${this.host}:${this.port}`) // tslint:disable-line no-console
        this.server!.listen(this.port, this.host)
      } else {
        // tslint:disable-next-line no-console
        console.log(`Starting application on 0.0.0.0:${this.port} (ipv4) or :::${this.port} (ipv6)`)
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

      this.server!.on('listening', () => resolve())
    })
  }
}
