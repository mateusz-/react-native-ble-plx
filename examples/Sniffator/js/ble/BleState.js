// @flow

import type { devices } from './BleTypes'

export type bleState = {
  devices: devices,
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
