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

const createDecorator = store => {
  // store.addReducer('counter', (state = 0, action) => {
  //   switch (action.type) {
  //     case 'INCREMENT':
  //       return state + 1
  //     case 'DECREMENT':
  //       return state - 1
  //     default:
  //       return state
  //   }
  // })
  store.addReducer('counter', createReducer(0, {
    increment: state => state + 1,
    decrement: state => state - 1
  }))

  return connect(
    state => state,
    dispatch => bindActionCreators({
      increment: () => ({type: 'increment'}),
      decrement: () => ({type: 'decrement'})
    }, dispatch)
  )
}

const decorator = createDecorator(store)

const Counter = decorator
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
