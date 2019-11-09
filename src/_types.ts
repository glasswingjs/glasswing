export interface INumberTMap<T> {
  [key: number]: T
}

export interface IStringTMap<T> {
  [key: string]: T
}

export interface INumberAnyMap extends INumberTMap<any> {}
export interface IStringAnyMap extends IStringTMap<any> {}

export interface INumberStringMap extends INumberTMap<string> {}
export interface IStringStringMap extends IStringTMap<string> {}

export interface INumberNumberMap extends INumberTMap<number> {}
export interface IStringNumberMap extends IStringTMap<number> {}

export interface INumberBooleanMap extends INumberTMap<boolean> {}
export interface IStringBooleanMap extends IStringTMap<boolean> {}

export type ICriteria = IStringAnyMap
export type IOptions = IStringAnyMap
