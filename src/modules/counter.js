import React, { Component } from 'react'
import { createReducer } from 'redux-act'
import { reconnect, createActions } from '../libs'

export default createReducer({
  add: (state, payload) => state + payload,
  increment: state => state + 1,
  decrement: state => state - 1
}, 0)

@reconnect('add', 'increment', 'decrement')
export class Counter extends Component {
  render() {
    const { counter, increment, decrement, add } = this.props
    return (
      <div>
        <p>Counter: {counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={e => add(2)}>add 2</button>
      </div>
    )
  }
}


