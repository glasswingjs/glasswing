import {RespondWith, RespondWithJson, RespondWithRaw, RespondWithYaml} from '../../src'

export interface RespondObject {
  test: string
}

export const respondObject: RespondObject = {
  test: 'test-data',
}

export class RespondWithController {
  @RespondWith((data: RespondObject) => data.test || '')
  public custom(): RespondObject {
    return respondObject
  }

  @RespondWithJson()
  public json(): RespondObject {
    return respondObject
  }

  @RespondWithJson()
  public jsonAsync(): Promise<RespondObject> {
    return new Promise(resolve => {
      setTimeout(() => resolve(respondObject), 200)
    })
  }

  @RespondWithRaw()
  public raw(): RespondObject {
    return respondObject
  }

  @RespondWithYaml()
  public yaml(): RespondObject {
    return respondObject
  }
}
