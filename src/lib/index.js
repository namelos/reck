import React, {Component} from 'react'
import {render} from 'react-dom'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { createAction, createReducer, bindReducers } from './utils'

const store = createStore(bindReducers())
store.reducers = {}

store.addReducer = (name, reducer) => {
  store.reducers[name] = reducer
  store.replaceReducer(bindReducers(store.reducers))
}

const createDecorator = store => (reducerName, initialState, handler) => {
  store.addReducer(reducerName, createReducer(initialState, handler))

  const actionTypes = Object.keys(handler)
  const actions = {}

  actionTypes.forEach(actionType => {
    const action = createAction(actionType)
    actions[actionType] = action
  })

  return connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
  )
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

