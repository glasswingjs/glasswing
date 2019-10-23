import {resolve, Singleton} from '../di'
import {RequestHandler, RequestMethod} from '../http'
import {Route, RouteRegistry} from '../route'

const routeRegistry: RouteRegistry = resolve(RouteRegistry)

export interface Controller {
  clearRoutes(): void
  registerRoute(method: RequestMethod, path: string, handler: RequestHandler): void
  registeredRoutes(): Route[]
}

export class AbstractController implements Controller {
  public clearRoutes() {
    routeRegistry.clear()
  }

  /**
   * Register a route within the application.
   * @param {RequestMethod} method
   * @param {string | string[]} path
   * @param {RequestHandler} handler
   * @returns {void}
   */
  public registerRoute(method: RequestMethod, path: string, handler: RequestHandler): void {
    routeRegistry.registerRoute(path, method, handler)
  }

  /**
   * Obtain the list of routes defined within controller
   * @returns {Route[]}
   */
  public registeredRoutes(): Route[] {
    return routeRegistry.routes
  }

  /**
   *
   * @returns RouteRegistry
   */
  public getRouteRegistry(): RouteRegistry {
    return routeRegistry
  }
}
