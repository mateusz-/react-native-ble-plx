// @flow

import type { bleState } from './BleState'
import type { bleAction } from './BleActions'

const initialState: bleState = {
  devices: [],
  selectedDeviceUUID: null,
  selectedServiceUUID: null,
  selectedCharacteristicUUID: null,
  scanning: false,
  errors: [],
  state: 'DISCONNECTED',
  operations: [],
  transactionId: null
}

export function bleReducer(state: bleState = initialState, action: () => bleAction) {
  switch (action.type) {
    case 'START_SCAN':
      return Object.assign({}, state, {
        scanning: true
      })

    case 'DEVICE_FOUND':
      return Object.assign({}, state, {
        devices: [...state.devices, action.device]
      })
  }
}
