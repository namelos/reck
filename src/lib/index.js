import React, {Component} from 'react'
import {render} from 'react-dom'
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindReducers} from './utils'
import createDecorator from './createDecorator'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from './DevTools'

const configureStore = config => {
  const enhancer = compose(
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )

  const store = enhancer(createStore)(bindReducers())
  store.reducers = {}

  store.addReducer = (name, reducer) => {
    store.reducers[name] = reducer
    store.replaceReducer(bindReducers(store.reducers))
  }

  return store
}

const store = configureStore()

export const reconnect = createDecorator(store)

export const rerender = (rootElement, mountNode) =>
  render(
    <Provider store={ store }>
      <div>
        { rootElement }
        <DevTools />
      </div>
    </Provider>,
    mountNode
  )

