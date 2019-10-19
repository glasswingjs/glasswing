// import {Singleton} from '../di'
import {AbstractController} from './controller'
import {Get} from '../route'

export class HelloWorldController extends AbstractController {
  @Get('/hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}
