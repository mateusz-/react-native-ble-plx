// @flow

import type { device, service, characteristic } from './BleTypes'
import type { deviceState } from './BleState'

export type bleAction = {
  type: bleActionType
}

export type bleActionType =
  | 'START_SCAN'
  | 'STOP_SCAN'
  | 'DEVICE_FOUND'
  | 'CHANGE_DEVICE_STATE'
  | 'WRITE_CHARACTERISTIC'
  | 'READ_CHARACTERISTIC'
  | 'MONITOR_CHARACTERISTIC'
  | 'UPDATE_SERVICES'
  | 'UPDATE_CHARACTERISTIC'
  | 'SELECT_SERVICE'
  | 'SELECT_CHARACTERISTIC'
  | 'PUSH_ERROR'
  | 'POP_ERROR'
  | 'EXECUTE_TRANSACTION'
  | 'COMPLETE_TRANSACTION'

export const startScan = (): bleAction => {
  return {
    type: 'START_SCAN'
  }
}

export const stopScan = (): bleAction => {
  return {
    type: 'STOP_SCAN'
  }
}

export const deviceFound = (device: device): bleAction => {
  return {
    type: 'DEVICE_FOUND',
    device: device
  }
}

export const changeDeviceState = (deviceUUID: string, state: deviceState): bleAction => {
  return {
    type: 'CHANGE_DEVICE_STATE',
    deviceUUID: deviceUUID,
    state: state
  }
}

export const updateServices = (deviceUUID: string, services: service[]): bleAction => {
  return {
    type: 'UPDATE_SERVICES',
    deviceUUID: deviceUUID,
    services: services
  }
}

export const updateCharacteristics = (
  deviceUUID: string,
  serviceUUID: string,
  characteristics: characteristic[]
): bleAction => {
  return {
    type: 'UPDATE_CHARACTERISTIC',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID,
    characteristics: characteristics
  }
}

export const writeCharacteristic = (
  deviceUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
  base64Value: string
): bleAction => {
  return {
    type: 'WRITE_CHARACTERISTIC',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID,
    base64Value: base64Value
  }
}

export const readCharacteristic = (deviceUUID: string, serviceUUID: string, characteristicUUID: string): bleAction => {
  return {
    type: 'READ_CHARACTERISTIC',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID
  }
}

export const monitorCharacteristic = (
  deviceUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
  monitor: boolean
): bleAction => {
  return {
    type: 'MONITOR_CHARACTERISTIC',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID,
    monitor: monitor
  }
}

export const selectService = (deviceUUID: string, serviceUUID: string): bleAction => {
  return {
    type: 'SELECT_SERVICE',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID
  }
}

export const selectCharacteristic = (
  deviceUUID: string,
  serviceUUID: string,
  characteristicUUID: string
): bleAction => {
  return {
    type: 'SELECT_CHARACTERISTIC',
    deviceUUID: deviceUUID,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID
  }
}

export const pushError = (errorMessage: string): bleAction => {
  return {
    type: 'PUSH_ERROR',
    errorMessage: errorMessage
  }
}

export const popError = (): bleAction => {
  return {
    type: 'POP_ERROR'
  }
}

export const executeTransaction = (transactionId: number): bleAction => {
  return {
    type: 'EXECUTE_TRANSACTION',
    transactionId: transactionId
  }
}

export const completeTransaction = (transactionId: number): bleAction => {
  return {
    type: 'COMPLETE_TRANSACTION',
    transactionId: transactionId
  }
}
