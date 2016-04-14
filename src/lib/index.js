import React, {Component} from 'react'
import {render} from 'react-dom'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { bindReducers } from './utils'
import createDecorator from './createDecorator'

const store = createStore(bindReducers())
store.reducers = {}

store.addReducer = (name, reducer) => {
  store.reducers[name] = reducer
  store.replaceReducer(bindReducers(store.reducers))
}

export const reconnect = createDecorator(store)

export const rerender = (rootElement, mountNode) =>
  render(
    <Provider store={ store }>
      <div>
        { rootElement }
      </div>
    </Provider>,
    mountNode
  )

