import {ParsedUrlQuery} from 'querystring'
import SetCookieParser from 'set-cookie-parser'
import {parse} from 'url'

import {Request, RequestAndResponse, RequestBodyDecoder, RequestHeader, Response} from '../../http/_types'

import {ArgumentMapperCallable, ArgumentSource} from './_types'

/******************************************************************************
 *
 * Helpers
 *
 *****************************************************************************/

/**
 * @Body(key:? string, decoder?: RequestBodyDecoder)
 *
 * If key is not mentioned or `null`, will return the entire decoded body.
 * If key is mentioned and not null, will return a certain property of the body, defined by the key's value.
 */
export const Body = (key?: string, decoder: RequestBodyDecoder = JSON.parse): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    const mapper = (data: any) => (key ? data[key] : data)

    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (req: Request): Promise<any> =>
        readRequestBody(req)
          .then(decoder)
          .then(mapper),
    )
  }
}

/**
 * Cookie(key?: string, value?: any)
 * If key is not mentioned or `null`, will return the entire cookies object.
 * If key is mentioned and not null, will return a certain property of the cookies object, defined by the key's
 * value.
 */
export const Cookie = (key?: string, value?: any): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (req: Request) => {
        const cookiesString: string = (req.headers || {}).cookie || ''
        // const cookiesArray: any[] = cookiesString
        //   .split(';')
        //   .map((cookie: string) => {
        //     var parts: string[] = cookie.split('=');
        //     return { [(parts.shift()||'').trim()]: decodeURI(parts.join('=')), }
        //   })
        // const cookies: any = Object.assign({}, ...cookiesArray)
        const cookies: any = SetCookieParser.parse(cookiesString.split('; '), {
          decodeValues: true,
          map: true,
        })
        return key ? cookies[key] : cookies
      },
      'request',
    )
  }
}

/**
 * Header(key?: string)
 * If key is not mentioned or `null`, will return the entire headers object.
 * If key is mentioned and not null, will return a certain property of the headers object, defined by the key's
 * value.
 */
export const Header = (key?: string): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (entity: RequestAndResponse) => {
        return key ? entity.request.headers[key] : entity.request.headers
      },
      'request',
    )
  }
}

/**
 * @Ip()
 */
export const Ip = (): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (req: Request): any => req.headers[RequestHeader.X_FORWARDED_FOR.toLowerCase()],
    )
  }
}

/**
 * @Param(key:? string)
 * If key is not mentioned or `null`, will return the entire decoded parameters object.
 * If key is mentioned and not null, will return a certain property of the parameters object, defined by the key's
 * value.
 */
export const Param = (key?: string): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(
      target,
      methodKey,
      parameterIndex,
      (params: object): any => (key ? (params as any)[key] : params),
      'params',
    )
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
export const Req = (): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(target, methodKey, parameterIndex, (req: Request): Request => req)
  }
}

/**
 * @Res()
 */
export const Res = (): ParameterDecorator => {
  return (target: any, methodKey: string | symbol, parameterIndex: number) => {
    appendParameterMapper(target, methodKey, parameterIndex, (res: Response): Response => res, 'response')
  }
}

// /**
//  * @Redirect(url: string, code: number = 301)
//  */

/******************************************************************************
 *
 * Helpers
 *
 *****************************************************************************/

/**
 *
 * @param methodName
 */
export const methodArgumentsDescriptor = (methodName: string | symbol): string =>
  `${typeof methodName === 'string' ? methodName : methodName.toString()}__Arguments`

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

/**
 *
 * @param target
 * @param methodName
 * @param parameterIndex
 * @param callable
 * @param source
 */
const appendParameterMapper = (
  target: any,
  methodName: string | symbol,
  parameterIndex: number,
  callable: ArgumentMapperCallable,
  source: ArgumentSource = 'request',
): void => {
  const methodDescriptor: string = methodArgumentsDescriptor(methodName)

  const metadata: any[] = Array(parameterIndex + 1)

  if (Reflect.hasMetadata(methodDescriptor, target)) {
    const oldMetadata = Reflect.getMetadata(methodDescriptor, target) as any[]
    oldMetadata.forEach((data, index) => {
      metadata[index] = data
    })
  }

  metadata[parameterIndex] = {
    callable,
    source,
  }
  Reflect.defineMetadata(methodDescriptor, metadata, target)
}
