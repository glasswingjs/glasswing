import 'reflect-metadata'
import {expect} from 'chai'
import {container} from 'tsyringe'

import {getControllerPathMappings, HelloWorldController, Route, RouteRegistry, RequestMethod} from '../src'

describe('lib/controller/decorators => @Controller', () => {
  let controller: any
  before(() => {
    controller = new HelloWorldController()
  })
  it('Controller::constructor() will return an object', () => {
    expect(controller).to.be.an('object')
  })

  it('Controller::constructor() routeRegistry metadata to be a RouteRegistry instance', () => {
    expect(getControllerPathMappings(controller)).to.be.an('object')
    expect(getControllerPathMappings(controller) instanceof RouteRegistry).to.be.true
  })

  it('Controller::inject() will return an object', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(anotherController).to.be.an('object')
  })

  it('Controller::inject() routeRegistry metadata to be a RouteRegistry instance', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(getControllerPathMappings(anotherController)).to.be.an('object')
    expect(getControllerPathMappings(anotherController) instanceof RouteRegistry).to.be.true
  })

  it('Controller routeRegistry will contain /hello-world route', () => {
    const routeRegistry: RouteRegistry = getControllerPathMappings(controller) as RouteRegistry
    const route: Route = routeRegistry.routes.find(
      r => r.method === RequestMethod.GET && r.path === '/hello-world',
    ) as Route
    expect(route).to.be.an('object')
  })
})
