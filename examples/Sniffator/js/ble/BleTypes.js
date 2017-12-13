// @flow

export type device = {
  uuid: string,
  name: string,
  rssi: number,
  isConnectable: boolean,
  services: service[]
}

export type service = {
  uuid: string,
  characteristics: characteristic[]
}

export type characteristic = {
  uuid: string,
  base64Value: string
}
