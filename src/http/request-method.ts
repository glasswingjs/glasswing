/**
 * List of Request Methods as described on MDN Documentation
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export enum RequestMethod {
  ALL = 'all',
  /**
   * The CONNECT method establishes a tunnel to the server identified by the target  resource.
   */
  CONNECT = 'connect',
  /**
   * The DELETE method deletes the specified resource.
   */
  DELETE = 'delete',
  /**
   * The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
   */
  GET = 'get',
  /**
   * The HEAD method asks for a response identical to that of a GET request, but without the response body.
   */
  HEAD = 'head',
  /**
   * The OPTIONS method is used to describe the communication options for the target resource.
   */
  OPTIONS = 'options',
  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  PATCH = 'patch',
  /**
   * The POST method is used to submit an entity to the specified resource, often causing a change in state or side
   * effects on the server.
   */
  POST = 'post',
  /**
   * @link https://github.com/symfony/http-foundation/blob/master/Request.php
   */
  PURGE = 'purge',
  /**
   * The PUT method replaces all current representations of the target resource with the request payload.
   */
  PUT = 'put',
  /**
   * The TRACE method performs a message loop-back test along the path to the target resource.
   */
  TRACE = 'trace',
}

export const AllRequestMethods: RequestMethod[] = [
  RequestMethod.DELETE,
  RequestMethod.GET,
  RequestMethod.HEAD,
  RequestMethod.OPTIONS,
  RequestMethod.PATCH,
  RequestMethod.POST,
  RequestMethod.PURGE,
  RequestMethod.PUT,
  RequestMethod.TRACE,
]
