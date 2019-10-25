import {Get} from '../route'
import {Controller} from './controller'

@Controller()
export class HelloWorldController {
  @Get('/hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}
