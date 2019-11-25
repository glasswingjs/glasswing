import {Controller, All, Body, Delete, Get, Head, Options, Param, Patch, Post, Put, Req, Request} from '../../src'

@Controller()
export class TestController {
  @All('/no-args-all')
  public noArgsAll(): string {
    return 'noArgsAll'
  }

  @Delete('/delete/:id')
  public delete(@Param('id') id: string): string {
    return `delete ${id}`
  }

  @Get('/no-args-get')
  public noArgsGet(): string {
    return 'noArgsGet'
  }

  @Get('/with-req-get')
  public withReqGet(@Req() req: Request): string {
    return req.url || ''
  }

  @Head('/head')
  public head(): string {
    return 'head'
  }

  @Options('/options')
  public options(): string {
    return 'options'
  }

  @Patch('/no-args-patch')
  public noArgsPatch(): string {
    return 'noArgsPatch'
  }

  @Post('/no-args-post')
  public noArgsPost(): string {
    return 'noArgsPost'
  }

  @Post('/with-args-post')
  public withArgsPost(@Body('test') test: string, @Body('test2') test2: string): string {
    return `post ${test} ${test2}`
  }

  @Put('/no-args-put')
  public noArgsPut(): string {
    return 'noArgsPut'
  }
}
