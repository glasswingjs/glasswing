import {Controller, Get} from './decorator'

@Controller()
export class HelloWorldController {
  @Get('/hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}
