// @flow

import * as bs from './BleState'
import * as ba from './BleActions'

const initialState: bs.bleState = {
  devices: {},
  selectedDeviceUUID: null,
  selectedServiceUUID: null,
  selectedCharacteristicUUID: null,
  scanning: false,
  errors: [],
  state: 'DISCONNECTED',
  operations: {},
  readWriteId: 0,
  monitorId: ''
}

const ble = {
  START_SCAN(state: bs.bleState, action: ba.startScan): bs.bleState {
    return Object.assign({}, state, {
      scanning: true
    })
  },
  STOP_SCAN(state: bs.bleState, action: ba.stopScan): bs.bleState {
    return Object.assign({}, state, {
      scanning: false
    })
  },
  DEVICE_FOUND(state: bs.bleState, action: ba.deviceFound): bs.bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.device.uuid] = action.device

    return Object.assign({}, state, {
      devices: devices
    })
  },
  CHANGE_DEVICE_STATE(state: bs.bleState, action: ba.changeDeviceState): bs.bleState {
    return Object.assign({}, state, {
      scanning: false,
      state: action.state,
      selectedDeviceUUID: action.deviceUUID
    })
  },
  UPDATE_SERVICES(state: bs.bleState, action: ba.updateServices): bs.bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.deviceUUID].services = action.services

    return Object.assign({}, state, {
      devices: devices
    })
  },
  UPDATE_CHARACTERISTICS(state: bs.bleState, action: ba.updateCharacteristics): bs.bleState {
    var devices: devices = Object.assign({}, state.devices)
    devices[action.deviceUUID][action.serviceUUID].characteristics = action.characteristics

    return Object.assign({}, state, {
      devices: devices
    })
  },
  WRITE_CHARACTERISTIC(state: bs.bleState, action: ba.writeCharacteristic): bs.bleState {
    var readWriteId: readWriteId = state.readWriteId + 1
    var operation: bs.operation = {
      type: 'WRITE',
      state: 'NEW',
      deviceUUID: action.deviceUUID,
      serviceUUID: action.serviceUUID,
      characteristicUUID: action.characteristicUUID,
      base64Value: action.base64Value,
      operationId: readWriteId
    }
    var operations: bs.operations = Object.assign({}, state.operations)
    operations[readWriteId] = operation
    return Object.assign({}, state, {
      operations: operations,
      operationId: readWriteId
    })
  },
  READ_CHARACTERISTIC(state: bs.bleState, action: ba.readCharacteristic): bs.bleState {
    var readWriteId: readWriteId = state.readWriteId + 1
    var operation: operation = {
      type: 'READ',
      state: 'NEW',
      deviceUUID: action.deviceUUID,
      serviceUUID: action.serviceUUID,
      characteristicUUID: action.characteristicUUID,
      base64Value: null,
      operationId: readWriteId
    }
    var operations: operations = Object.assign({}, state.operations)
    operations[readWriteId] = operation
    return Object.assign({}, state, {
      operations: operations,
      readWriteId: readWriteId
    })
  },
  MONITOR_CHARACTERISTIC(state: bs.bleState, action: ba.monitorCharacteristic): bs.bleState {
    var monitorId: monitorId = action.deviceUUID + '_' + action.serviceUUID + '_' + action.characteristicUUID

    if (!action.monitor) {
      let operation: operation = Object.assign({}, state.operations[monitorId], {
        state: 'CANCEL'
      })
      let operations: operations = Object.assign({}, state.operations)
      operations[monitorId] = operation
      return Object.assign({}, state, {
        operations: operations
      })
    }
    let operation: operation = {
      type: 'MONITOR',
      state: 'NEW',
      deviceUUID: action.deviceUUID,
      serviceUUID: action.serviceUUID,
      characteristicUUID: action.characteristicUUID,
      base64Value: null,
      operationId: monitorId
    }
    let operations: operations = Object.assign({}, state.operations)
    operations[monitorId] = operation
    return Object.assign({}, state, {
      operations: operations,
      monitorId: monitorId
    })
  },
  SELECT_SERVICE(state: bs.bleState, action: ba.selectService): bs.bleState {
    return Object.assign({}, state, {
      selectedServiceUUID: action.serviceUUID
    })
  },
  SELECT_CHARACTERISTIC(state: bs.bleState, action: ba.selectCharacteristic): bs.bleState {
    return Object.assign({}, state, {
      selectedCharacteristicUUID: action.characteristicUUID
    })
  },
  PUSH_ERROR(state: bs.bleState, action: ba.pushError): bs.bleState {
    return Object.assign({}, state, {})
  },
  POP_ERROR(state: bs.bleState, action: ba.popError): bs.bleState {
    return Object.assign({}, state, {})
  },
  EXECUTE_TRANSACTION(state: bs.bleState, action: ba.executeTransaction): bs.bleState {
    var operations: operations = state.operations
    operations[action.transactionId].state = 'IN_PROGRESS'
    return Object.assign({}, state, {
      operations: operations
    })
  },
  COMPLETE_TRANSACTION(state: bs.bleState, action: ba.completeTransaction): bs.bleState {
    return Object.assign({}, state, {})
  }
}

export function bleReducer(state: bs.bleState = initialState, action: ba.action) {
  return ble[action.type](state, action)
}
