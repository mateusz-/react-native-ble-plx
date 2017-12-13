import { AppRegistry } from 'react-native'
import App from './js/App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import BleReducer from './ble/BleReducer'

const store = createStore(BleReducer, applyMiddleware(thunk))

AppRegistry.registerComponent('Sniffator', () => App)
