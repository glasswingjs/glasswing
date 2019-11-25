import {ResponseBodyEncoder} from './../../http/_types'
import {ControllerAction, isAsync, wrapPropertyDescriptorHandler} from './_utils'
import YAML from 'yaml'
import {encode} from 'punycode'

/**
 * Comment
 *
 * @returns {MethodDecorator}
 */
export const RespondWith = (bodyEncoder: ResponseBodyEncoder = data => data, ...other: any[]): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => {
  const handler = (oldMethod: ControllerAction) => {
    return (...args: any[]) =>
      isAsync(oldMethod)
        ? oldMethod(...args).then((result: any) => bodyEncoder(result, ...other))
        : bodyEncoder(oldMethod(...args), ...other)
  }
  return wrapPropertyDescriptorHandler(descriptor, handler)
}

/**
 * Wrap controller respond with raw data
 *
 * @param args
 */
export const RespondWithRaw =(...args: any[]): MethodDecorator => RespondWith((data: any) => data, ...args)

/**
 * Wrap controller action to encode response into a JSON string
 *
 * @param args
 */
export const RespondWithJson = (...args: any[]): MethodDecorator => RespondWith(JSON.stringify, ...args)

/**
 * Wrap controller action to encode response into a YAML string
 *
 * @param args
 */
export const RespondWithYaml = (...args: any[]): MethodDecorator => RespondWith(YAML.stringify, ...args)
