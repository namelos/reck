import React, {Component} from 'react'
import {render} from 'react-dom'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reducer as form} from 'redux-form'
import DevTools from './DevTools'

const createReducer = (initialState, handlers) =>
  (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type))
      return handlers[action.type](state, action.payload)
    else
      return state
  }

const createAction = type => payload => ({ type, payload })

/* --- */

const bindReducers = reducers =>
  combineReducers({form, ...reducers})

const enhancer = compose(DevTools.instrument())

const store = enhancer(createStore)(bindReducers())
store.reducers = {}

store.addReducer = (name, reducer) => {
  store.reducers[name] = reducer
  store.replaceReducer(bindReducers(store.reducers))
}

const createDecorator = store => (reducerName, initialState, handler) => {
  store.addReducer(reducerName, createReducer(initialState, handler))

  const actionTypes = Object.keys(handler)
  const actions = {}

  actionTypes.forEach(action => actions[action] = createAction(action))

  return connect(
    state => state,
    dispatch => bindActionCreators({
      increment: createAction('increment'),
      decrement: createAction('decrement')
    }, dispatch)
  )
}

const reconnect = createDecorator(store)

const Counter = reconnect('counter', 0, {
  increment: state => state + 1,
  decrement: state => state - 1
})
(({counter, increment, decrement}) => {
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
    <div>
      <Counter />
      <DevTools />
    </div>
  </Provider>,
  document.querySelector('#app')
)
