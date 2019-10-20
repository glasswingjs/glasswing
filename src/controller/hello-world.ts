import {Get} from '../route'
// import {Singleton} from '../di'
import {AbstractController} from './controller'

export class HelloWorldController extends AbstractController {
  @Get('/hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}
