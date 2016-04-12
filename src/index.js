import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'

import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { reduxForm, reducer as form } from 'redux-form'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import { Counter } from './modules'

const logger = createLogger()

import { DevTools } from './modules'

const enhancer = compose(
  compose(applyMiddleware(thunk, logger),
          DevTools.instrument()))

import reducer from './modules'

export const store = enhancer(createStore)(reducer)

render(
  <Provider store={store}>
    <div>
      <DevTools />
      <Counter />
    </div>
  </Provider>,
  document.getElementById('app')
)
