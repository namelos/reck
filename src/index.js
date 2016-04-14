import React, {Component} from 'react'
import {render} from 'react-dom'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createAction, createReducer} from 'redux-act'
import {reducer as form} from 'redux-form'
import DevTools from './DevTools'

const baseReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const bindReducers = reducers =>
  combineReducers({baseReducer, ...reducers})

const enhancer = compose(
  DevTools.instrument()
)

const store = createStore(bindReducers())
store.reducers = {}

store.addReducer = (name, reducer) => {
  store.reducers[name] = reducer
  store.replaceReducer(bindReducers(store.reducers))
}

render(
  <Provider store={store}>
    <div>

    </div>
  </Provider>,
  document.querySelector('#app')
)

// const counter = createReducer({
//   increment: state => state + 1,
//   decrement: state => state - 1
// }, 0)

// store.addReducer('counter', counter)

const reconnect = (reducerName, initialState, handler) => Element => {
  const reducer = createReducer(handler, initialState)

  store.addReducer(reducerName, reducer)

  const actionTypes = Object.keys(handler)
  actionTypes.pop()

  const actions = {}

  for(let key in actionTypes) {
    const key = actionTypes[key]
    const type = key.toUpperCase()
    const action = createAction(type)
    actions[key] = actions
  }

  return connect(
    state => state,
    dispatch => bindActionCreators({ actions }, dispatch)
  )
}

const Counter = reconnect('counter', 0, {
  increment: state => state + 1,
  decrement: state => state - 1
})
(({ counter, increment, decrement }) => {
  return (
    <div>
      <p>{ counter }</p>
      <button onClick={increment}>inc</button>
      <button onClick={decrement}>dec</button>
    </div>
  )
})

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.querySelector('#app')
)

