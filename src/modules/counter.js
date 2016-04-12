import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-act'
const reconnect = actions =>
  connect(
    state => state,
    dispatch => bindActionCreators({ ...actions }, dispatch))

const increment = createAction('increment the state')
const decrement = createAction('decrement the state')

export default createReducer({
  [increment]: state => state + 1,
  [decrement]: state => state - 1
}, 0)

export const Counter = reconnect({ increment, decrement })(
  ({ counter, increment, decrement }) => <div>
    <p>Counter: {counter}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
)
