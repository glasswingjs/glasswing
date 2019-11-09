import {ParsedUrlQuery} from 'querystring'
import SetCookieParser from 'set-cookie-parser'
import {parse} from 'url'

import {
  ParameterMapperCallable,
  ParameterSource,
  Request,
  RequestAndResponse,
  RequestBodyDecoder,
  RequestHeader,
  Response,
} from './_types'

/**
 *
 * @link https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/
 * @param req
 */
const readRequestBody = async (req: Request): Promise<string> =>
  new Promise((resolve, reject) => {
    const body: Uint8Array[] = []
    req
      .on('error', err => reject(err))
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        const str: string = Buffer.concat(body).toString()
        resolve(str)
      })
  })

const appendParameterMapper = (
  target: any,
  methodName: string | symbol,
  parameterIndex: number,
  callable: ParameterMapperCallable,
  source: ParameterSource = 'request',
): void => {
  const methodArgumentsDescriptor: string = `${
    typeof methodName === 'string' ? methodName : methodName.toString()
  }__Arguments`
  const metadata: any[] = Array(parameterIndex + 1)
  if (Reflect.hasMetadata(methodArgumentsDescriptor, target)) {
    const oldMetadata = Reflect.getMetadata(methodArgumentsDescriptor, target) as any[]
    oldMetadata.forEach((data, index) => {
      metadata[index] = data
    })
  }
  metadata[parameterIndex] = {
    callable,
    source,
  }
  Reflect.defineMetadata(methodArgumentsDescriptor, metadata, target)
  // console.log(metadata)
}

/**
 * Body(key:? string, decoder?: RequestBodyDecoder)
 * If key is not mentioned or `null`, will return the entire decoded body.
 * If key is mentioned and not null, will return a certain property of the body, defined by the key's value.
 */
export const Body = (key?: string, decoder: RequestBodyDecoder = JSON.parse): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      async (req: Request): Promise<any> => {
        const bodyData: ParsedUrlQuery = decoder(await readRequestBody(req))
        return key ? bodyData[key] : bodyData
      },
    )
  }
}

/**
 * Cookie(key?: string, value?: any)
 * If key is not mentioned or `null`, will return the entire cookies object.
 * If key is mentioned and not null, will return a certain property of the cookies object, defined by the key's
 * value.
 * If value is mentioned, it will set a new cookie based on key and value.
 *
 * TODO: Should add expires and domain parameters.
 */
export const Cookie = (key?: string, value?: any): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (entity: RequestAndResponse) => {
        if (value === undefined) {
          const cookiesString: string = (entity.request.headers || {}).cookie || ''
          // const cookiesArray: any[] = cookiesString
          //   .split(';')
          //   .map((cookie: string) => {
          //     var parts: string[] = cookie.split('=');
          //     return { [(parts.shift()||'').trim()]: decodeURI(parts.join('=')), }
          //   })
          // const cookies: any = Object.assign({}, ...cookiesArray)
          const cookies: any = SetCookieParser.parse(cookiesString)
          return key ? cookies[key] : cookies
        }
        if (!key) {
          throw new Error() // TODO:
        }
        entity.response.writeHead(200, {
          [RequestHeader.SET_COOKIE]: `${key}=${value}`,
          [RequestHeader.CONTENT_TYPE]: 'text/plain',
        })
      },
      'request+response',
    )
  }
}

/**
 * Header(key?: string, value?: any)
 * If key is not mentioned or `null`, will return the entire headers object.
 * If key is mentioned and not null, will return a certain property of the headers object, defined by the key's
 * value.
 * If value is mentioned, it will set the specified value to the key.
 */
export const Header = (key?: string, value?: any): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(target, methodKey, parameterIndex, (entity: RequestAndResponse) => {
      if (value === undefined) {
        return key ? entity.request.headers[key] : entity.request.headers
      }
      if (!key) {
        throw new Error() // TODO:
      }
      entity.response.setHeader(key, value)
      return value
    })
  }
}

/**
 * @Ip()
 */
export const Ip = (target: any, methodKey: string | symbol, parameterIndex: number) => {
  appendParameterMapper(
    target,
    methodKey,
    parameterIndex,
    (req: Request): any => req.headers[RequestHeader.X_FORWARDED_FOR],
  )
}

/**
 * @Param(key:? string)
 * If key is not mentioned or `null`, will return the entire decoded parameters object.
 * If key is mentioned and not null, will return a certain property of the parameters object, defined by the key's
 * value.
 */
export const Param = (key?: string): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(target, methodKey, parameterIndex, (params: object): any => {
      return key ? (params as any)[key] : params
    })
  }
}

/**
 * @Query(key:? string)
 * If key is not mentioned or `null`, will return the entire query object.
 * If key is mentioned and not null, will return a certain property of the query object, defined by the key's value.
 */
export const Query = (key?: string): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(target, methodKey, parameterIndex, (req: Request): any => {
      const queryData: ParsedUrlQuery = parse(req.url || '', true).query
      return key ? queryData[key] : queryData
    })
  }
}

/**
 * @Req()
 */
export const Req = (target: any, methodKey: string | symbol, parameterIndex: number) => {
  appendParameterMapper(target, methodKey, parameterIndex, (req: Request): Request => req)
}

/**
 * @Res()
 */
export const Res = (target: any, methodKey: string | symbol, parameterIndex: number) => {
  appendParameterMapper(target, methodKey, parameterIndex, (res: Response): Response => res, 'response')
}

/**
 * @Redirect(url: string, code: number = 301)
 */
