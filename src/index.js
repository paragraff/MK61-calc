import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store'

import MicroFactory from './Core/MicroFactory'
import {firmware1302, firmware1303, firmware1306} from './Core/firmwares'
import Motherboard from './Core/Motherboard'

window.store = store;

const factory = new MicroFactory()
const motherboard = new Motherboard(factory, firmware1302, firmware1303, firmware1306)

ReactDOM.render(
  <Provider store = {store}>
    <App core={motherboard}/>
  </Provider>,
  document.getElementById('root')
)
