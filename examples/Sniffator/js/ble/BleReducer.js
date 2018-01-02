// @flow

import type { bleState } from './BleState'
import * as ba from './BleActions'

const initialState: bleState = {
  devices: {},
  selectedDeviceUUID: null,
  selectedServiceUUID: null,
  selectedCharacteristicUUID: null,
  scanning: false,
  errors: [],
  state: 'DISCONNECTED',
  operations: [],
  transactionId: null
}

const ble = {
  START_SCAN(state: bleState, action: ba.startScan): bleState {
    return Object.assign({}, state, {
      scanning: true
    })
  },
  STOP_SCAN(state: bleState, action: ba.stopScan): bleState {
    return Object.assign({}, state, {
      scanning: false
    })
  },
  DEVICE_FOUND(state: bleState, action: ba.deviceFound): bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.device.uuid]

    return Object.assign({}, state, {
      devices: devices
    })
  },
  CHANGE_DEVICE_STATE(state: bleState, action: ba.changeDeviceState): bleState {
    return Object.assign({}, state, {
      scanning: false,
      state: action.state,
      selectedDeviceUUID: action.deviceUUID
    })
  },
  UPDATE_SERVICES(state: bleState, action: ba.updateServices): bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.deviceUUID].services = action.services

    return Object.assign({}, state, {
      devices: devices
    })
  },
  UPDATE_CHARACTERISTICS(state: bleState, action: ba.updateCharacteristics): bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.deviceUUID][action.serviceUUID].characteristics = action.characteristics

    return Object.assign({}, state, {
      devices: devices
    })
  },
  // WRITE_CHARACTERISTIC(state: bleState, action: ba.writeCharacteristic): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // READ_CHARACTERISTIC(state: bleState, action: ba.readCharacteristic): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // MONITOR_CHARACTERISTIC(state: bleState, action: ba.monitorCharacteristic): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // SELECT_SERVICE(state: bleState, action: ba.selectService): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // SELECT_CHARACTERISTIC(state: bleState, action: ba.selectCharacteristic): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // PUSH_ERROR(state: bleState, action: ba.pushError): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // POP_ERROR(state: bleState, action: ba.popError): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // EXECUTE_TRANSACTION(state: bleState, action: ba.executeTransaction): bleState {
  //   return Object.assign({}, state, {

  //   })
  // },
  // COMPLETE_TRANSACTION(state: bleState, action: ba.completeTransaction): bleState {
  //   return Object.assign({}, state, {

  //   })
  // }
}

export function bleReducer(state: bleState = initialState, action: ba.action) {
  return ble[action.type](state, action)
}
