import {resolve, Singleton} from '../di'
import {RequestHandler} from 'express' // TODO: Must be express independent
import {RequestMethod} from '../request'

export interface ControllerRoute {
  method: RequestMethod
  paths: string[]
  handler: RequestHandler
}

@Singleton()
export class ControllerRouteRegistry {
  private registry: ControllerRoute[] = []

  /**
   * Clear the regiutry. Use only when Router is destroyed.
   */
  public clear() {
    this.registry = []
  }

  /**
   * Register a route within the application.
   * @param {RequestMethod} method
   * @param {string | string[]} path
   * @param {RequestHandler} handler
   * @returns {void}
   */
  public registerRoute(method: RequestMethod, path: string | string[], handler: RequestHandler): void {
    const paths: string[] = Array.isArray(path) ? path : [path]

    const matches: ControllerRoute[] = this.registry.filter((route: ControllerRoute) => {
      return route.method === method && (route.paths as []).filter(p => -1 !== path.indexOf(p)).length
    })
    if (matches.length) {
      throw new Error(`Route '${path}' already exists.`)
    }

    this.registry.push({
      method,
      paths,
      handler,
    })
  }

  /**
   * Obtain the list of routes stored in the registry
   * Getter
   * @returns {ControllerRoute[]}
   */
  get routes(): ControllerRoute[] {
    return this.registry
  }
}

const routeRegistry: ControllerRouteRegistry = resolve(ControllerRouteRegistry)

export interface Controller {
  clearRoutes(): void
  registerRoute(method: RequestMethod, path: string | string[], handler: RequestHandler): void
  registeredRoutes(): ControllerRoute[]
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
  public registerRoute(method: RequestMethod, path: string | string[], handler: RequestHandler): void {
    routeRegistry.registerRoute(method, path, handler)
  }

  /**
   * Obtain the list of routes defined within controller
   * @returns {ControllerRoute[]}
   */
  public registeredRoutes(): ControllerRoute[] {
    return routeRegistry.routes
  }

  public getRouteRegistry(): ControllerRouteRegistry {
    return routeRegistry
  }
}
