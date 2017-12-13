// @flow

import type { device } from './BleTypes'

export type bleState = {
  devices: device[],
  selectedDeviceUUID: ?string,
  selectedServiceUUID: ?string,
  selectedCharacteristicUUID: ?string,
  scanning: boolean,
  errors: string[],
  state: deviceState,
  operations: [string, string][],
  transactionId: ?number
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
