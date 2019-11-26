import 'reflect-metadata'
import {expect} from 'chai'
import YAML from 'yaml'

import {respondObject, RespondWithController} from './controller'

describe('lib/controller/decorator/respond-with => *', () => {
  let controller: RespondWithController

  beforeEach(() => {
    controller = new RespondWithController()
  })

  it('@RespondWith(custom) => Should add a @RespondWith decorator on method', () => {
    expect(controller.custom()).to.equal(respondObject.test)
  })

  it('@RespondWithJson() => Should add a @RespondWithJson decorator on method', () => {
    expect(controller.json()).to.equal(JSON.stringify(respondObject))
  })

  it('@RespondWithJson() => Should add a @RespondWithJson decorator on method', done => {
    controller
      .jsonAsync()
      .then(result => expect(result).to.equal(JSON.stringify(respondObject)))
      .then(() => done())
  })

  it('@RespondWithRaw() => Should add a @RespondWithRaw decorator on method', () => {
    expect(controller.raw().test).to.equal(respondObject.test)
  })

  it('@RespondWithYaml() => Should add a @RespondWithYaml decorator on method', () => {
    expect(controller.yaml()).to.equal(YAML.stringify(respondObject))
  })
})
