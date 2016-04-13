import React from 'react'
import { render } from 'react-dom'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'

const baseReducer = (state = {}, action) => {
  switch (action.type) {
    default: return state
  }
}

export default (rootComponent, mountNode, config) => {
  const enhancers = []

  if (config && config.middlewares)
    enhancers.push(applyMiddleware(...config.middlewares))

  const enhancer = compose(...enhancers)

  const createReducer = reducers =>
    combineReducers({ ...reducers })

  const configureStore = () => {
    let store = createStore(createReducer({ baseReducer }))
    store.reducers = {}
    return store
  }

  const store = configureStore()

  store.addReducer = (name, reducer) => {
    store.reducers[name] = reducer
    store.replaceReducer(createReducer(store.reducers))
  }

  render(
    <Provider store={ store }>
      { rootComponent }
    </Provider>,
    mountNode
  )
}
