export type ControllerAction = (...args: any[]) => any

/**
 *
 * @param func
 */
export const isAsync = (func: ControllerAction) => func.constructor.name === 'AsyncFunction'

/**
 * Wraps a decorator's PropertyDescriptor param by extending the descriptor.value with a wrapper
 *
 * @param descriptor
 * @param handler
 */
export const wrapPropertyDescriptorHandler = (
  descriptor: PropertyDescriptor,
  handler: (oldMethod: ControllerAction) => any,
): PropertyDescriptor =>
  Object.assign(descriptor, {
    value: handler(descriptor.value),
  })
