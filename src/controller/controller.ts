import 'reflect-metadata'
import {Singleton} from '../di'
import {RouteRegistry} from '../route'

export class AbstractController {
  constructor() {
    if (!Reflect.hasMetadata('routeRegistry', this)) {
      Reflect.defineMetadata('routeRegistry', new RouteRegistry(), this)
    }
  }
}

/**
 * @Controller() decorator.
 *
 * @returns {ClassDecorator}
 */
export function Controller(): ClassDecorator {
  return (target: any): void => {
    if (!Reflect.hasMetadata('routeRegistry', target)) {
      Reflect.defineMetadata('routeRegistry', new RouteRegistry(), target)
    }

    Singleton()(target)
  }
}
