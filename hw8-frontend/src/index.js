require('./styles.css')
require('expose?$!expose?jQuery!jquery')

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Reducer from './reducers'
import App from './components/app'
import {init} from './components/auth/authActions'

const store = createStore(Reducer, applyMiddleware(thunk))
store.dispatch(init(""))
render(
    <Provider store={store}>
        <App title='Front-End-App'/>
    </Provider>,
    document.getElementById('app')
)