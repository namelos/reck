import React, {Component} from 'react'
import {reconnect, rerender} from './lib'

@reconnect('counter1', 0, {
  increment: state => state + 1,
  decrement: state => state - 1,
  counter2_increment: null,
  counter2_decrement: null,
  _test: null
}, {
  fetch: (dispatch, getState) => dispatch('counter2_increment')
})
class Counter1 extends Component {
  render() {
    const {counter1, increment, decrement, counter1_increment, counter1_decrement,
      counter2_increment, counter2_decrement, test } = this.props
    return (
      <div>
        <p>{counter1}</p>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        <br/>
        <button onClick={counter1_increment}>counter1_increment</button>
        <button onClick={counter1_decrement}>counter1_decrement</button>
        <br/>
        <button onClick={counter2_increment}>counter2_increment</button>
        <button onClick={counter2_decrement}>counter2_decrement</button>
        <br/>
        <button onClick={test}>async</button>
      </div>
    )
  }
}

@reconnect('counter2', 0, {
  increment: state => state + 1,
  decrement: state => state - 1,
  counter1_increment: null,
  counter1_decrement: null,
})
class Counter2 extends Component {
  render() {
    const {counter2, increment, decrement, counter1_increment, counter1_decrement,
      counter2_increment, counter2_decrement } = this.props
    return (
      <div>
        <p>{counter2}</p>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        <br/>
        <button onClick={counter1_increment}>counter1_increment</button>
        <button onClick={counter1_decrement}>counter1_decrement</button>
        <br/>
        <button onClick={counter2_increment}>counter2_increment</button>
        <button onClick={counter2_decrement}>counter2_decrement</button>
      </div>
    )
  }
}

rerender(
  <div>
    <Counter1 />
    <Counter2 />
  </div>, document.querySelector('#app'))
