import {Injectable, Singleton} from '../di'
import {RequestHandler, RequestMethod} from '../http'

export interface Route {
  method: RequestMethod
  path: string
  handler: RequestHandler
}

export class RouteRegistryArgumentException extends Error {}

export class RouteRegistryRouteExistsException extends Error {}

@Singleton()
export class RouteRegistry {
  private registry: Route[] = []

  /**
   * Clear the regiutry. Use only when Router is destroyed.
   */
  public clear() {
    this.registry = []
  }

  /**
   * Register a route within the application.
   * @param {string} path
   * @param {RequestMethod} method
   * @param {RequestHandler} handler
   * @throws {RouteRegistryException}
   * @returns {void}
   */
  public registerRoute(route: string | Route, method?: RequestMethod, handler?: RequestHandler): void {
    let xroute: Route
    if (typeof route === 'string') {
      if (!handler) {
        throw new RouteRegistryArgumentException(
          'For `registryRoute(string, RequestMethod, RequestHandler)` form, `handler` parameter si mandatory.',
        )
      }
      xroute = {
        handler,
        method: method || RequestMethod.GET,
        path: route,
      }
    } else {
      xroute = route
    }

    const match: Route | undefined = this.registry.find(
      (r: Route) => r.path === xroute.path && r.method === xroute.method,
    )
    if (match) {
      throw new RouteRegistryRouteExistsException(
        `A route for path \'${xroute.path}\' with method \'${xroute.method}\' was already added.`,
      )
    }

    this.registry.push(xroute)
  }

  /**
   * Obtain the list of routes stored in the registry
   * Getter
   * @returns {Route[]}
   */
  get routes(): Route[] {
    return this.registry
  }

  /**
   * Unregister routes
   * @param {string} path
   * @param {RequestMethod} method
   * @returns {void}
   */
  public unregisterRoutes(path: string, method?: RequestMethod): void {
    this.registry = this.registry
      .map((r: Route) => (r.path === path && (r.method === method || method === undefined) ? null : r))
      .filter((r: Route | null) => r !== null) as Route[]
  }
}
