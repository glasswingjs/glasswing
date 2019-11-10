export type ArgumentSource = 'request' | 'response' | 'request+response' | 'router'

export type ArgumentMapperCallable = (entity: any) => any

export interface ParameterDescriptor {
  callable: ArgumentMapperCallable
  source: ArgumentSource
}
