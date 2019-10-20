import {RequestMethod} from '../http'

export type XFunction = (...args: any[]) => any

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
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
      const controller = target
      const callable = descriptor.value

      /**
       *
       * @param {XFunction} req
       * @param {XFunction} res
       * @param {XFunction} next
       */
      const handler: XFunction = (req: XFunction, res: XFunction, next?: XFunction) => {
        // TODO: find a way to inject callable's arguments
        if (res) {
          // console.log('ala bala', req, res)
          // res.send(callable.apply(null))
        }
        return next
      }

      controller.registerRoute(method, path || '/', handler)

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
