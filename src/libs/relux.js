import React from 'react'
import {render} from 'react-dom'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createAction, createReducer} from 'redux-act'

const baseReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const relux = config => {
  const createReducer = reducers =>
    combineReducers({...reducers})

  const configureStore = () => {
    let store = createStore(createReducer({baseReducer}))
    store.reducers = {}

    store.addReducer = (name, reducer) => {
      store.reducers[name] = reducer
      store.replaceReducer(createReducer(store.reducers))
    }

    return store
  }

  return configureStore()
}

const store = relux()

const createRelux = store => (reducerName, initialState, handler, asyncHandler) => ComposedComponent => {
  const reducer = createReducer(handler, initialState)

  store.addReducer(reducerName, reducer)

  const actions = Object.keys(handler).map(createAction)

  return connect(
    state => state,
    dispatch => bindActionCreators({...actions, ...asyncHandler}, dispatch)
  )
}

const reconnect = createRelux(store)

