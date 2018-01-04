// @flow

import type { devices } from './BleTypes'

export type readWriteId = number
export type monitorId = string

export type operationId = readWriteId | monitorId

export type bleState = {
  devices: devices,
  selectedDeviceUUID: ?string,
  selectedServiceUUID: ?string,
  selectedCharacteristicUUID: ?string,
  scanning: boolean,
  errors: string[],
  state: deviceState,
  operations: operations,
  readWriteId: readWriteId,
  monitorId: monitorId
}

export type deviceState =
  | 'DISCONNECT'
  | 'DISCONNECTING'
  | 'DISCONNECTED'
  | 'CONNECT'
  | 'CONNECTING'
  | 'DISCOVERING'
  | 'FETCHING SERVICES AND CHARACTERISTICS'
  | 'CONNECTED'

export type operations = {
  [operationId: operationId]: operation
}

export type operation = {
  type: operationType,
  state: operationState,
  deviceUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
  base64Value: ?string,
  operationId: operationId
}

export type operationType = 'WRITE' | 'READ' | 'MONITOR'

export type operationState = 'NEW' | 'IN_PROGRESS' | 'CANCEL'
