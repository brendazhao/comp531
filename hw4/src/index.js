require('./styles.css')
require('expose?$!expose?jQuery!jquery')

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'


import Reducer from './reducers'
import App from './components/app'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))
render(
    <Provider store={store}>
        <App title='Front-End-App'/>
    </Provider>,
    document.getElementById('app')
)