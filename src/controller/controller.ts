import {container} from 'tsyringe'
import {RequestHandler, RequestMethod} from '../http'
import {Route, RouteRegistry} from '../route'
import {Inject} from '../di'

export class AbstractController {
  // protected routeRegistry: RouteRegistry

  constructor(@Inject(RouteRegistry) protected routeRegistry: RouteRegistry) {}

  public clearRoutes() {
    this.routeRegistry.clear()
  }

  /**
   * Register a route within the application.
   * @param {Route | string} route
   * @param {RequestMethod} method
   * @param {RequestHandler} handler
   * @returns {void}
   */
  public registerRoute(route: Route | string, method?: RequestMethod, handler?: RequestHandler): void {
    // this.routeRegistry.registerRoute(route, method, handler)
  }

  /**
   * Obtain the list of routes defined within controller
   * @returns {Route[]}
   */
  public registeredRoutes(): Route[] {
    return []
    // return this.routeRegistry.routes
  }

  /**
   *
   * @returns RouteRegistry
   */
  public getRouteRegistry(): RouteRegistry {
    return this.routeRegistry
  }
}
