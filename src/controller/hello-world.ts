import {Get, RouteRegistry} from '../route'
import {Inject, Singleton} from '../di'
import {AbstractController} from './controller'

@Singleton()
export class HelloWorldController extends AbstractController {
  constructor(@Inject(RouteRegistry) protected routeRegistry: RouteRegistry) {
    super(routeRegistry)
  }

  @Get('/hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}
