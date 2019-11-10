import 'reflect-metadata'
import {Singleton} from '../di'
import {RouteRegistry} from '../route'

/**
 * Abstract Controller class.
 */
export class AbstractController {
  constructor() {
    if (!Reflect.hasMetadata('routeRegistry', this)) {
      Reflect.defineMetadata('routeRegistry', new RouteRegistry(), this)
    }
  }
}
