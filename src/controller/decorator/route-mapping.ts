import {Request, RequestHandler, RequestMethod, Response} from '../../http'
import {RouteRegistry} from '../../route'

/**
 * @link https://nehalist.io/routing-with-typescript-decorators/#routedecorator
 */

export type XFunction = (...args: any[]) => any

const mapHandlerArguments = (req: Request, res: Response, params: any[], metadata: any[]): any[] => {
  return []
}

/**
 *
 * @param {RequestMethod} method
 */
const createRouteMappingDecorator = (method: RequestMethod) => {
  /**
   *
   * @param {string|string[]} path
   */
  const decorator = (path?: string | string[]): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const routeRegistry: RouteRegistry = Reflect.hasMetadata('routeRegistry', target.constructor)
        ? (Reflect.getMetadata('routeRegistry', target.constructor) as RouteRegistry)
        : new RouteRegistry()

      // const metadata = Reflect.getMetadata(methodArgumentsDescriptor(propertyKey), target) as any[]
      // console.log(methodArgumentsDescriptor(propertyKey), metadata, target)

      /**
       *
       * @param {Request} req
       * @param {Response} res
       * @param {NextFunction} next
       */
      const handler: RequestHandler = (req: Request, res: Response /*, params: any[]*/) => {
        // const args: any[] = mapHandlerArguments(req, res, params, Reflect.getMetadata(
        //   methodArgumentsDescriptor(propertyKey),
        //   target,
        // ) as any[])
      }

      path = Array.isArray(path) ? path : [path || '/']

      path.forEach(p => routeRegistry.registerRoute(p, method, handler))

      Reflect.defineMetadata('routeRegistry', routeRegistry, target)

      return Object.assign(descriptor, {
        value: handler,
      })
    }
  }
  return decorator
}

export const All = createRouteMappingDecorator(RequestMethod.ALL)

export const Delete = createRouteMappingDecorator(RequestMethod.DELETE)

export const Get = createRouteMappingDecorator(RequestMethod.GET)

export const Head = createRouteMappingDecorator(RequestMethod.HEAD)

export const Options = createRouteMappingDecorator(RequestMethod.OPTIONS)

export const Patch = createRouteMappingDecorator(RequestMethod.PATCH)

export const Post = createRouteMappingDecorator(RequestMethod.POST)

export const Put = createRouteMappingDecorator(RequestMethod.PUT)
