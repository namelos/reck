import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { increment, decrement } from '../modules'

// @connect(
//   ({ counter }) => ({ counter }),
//   dispatch => bindActionCreators({ increment, decrement }, dispatch)
// )
export class Counter extends Component {
  render() {
    const { counter, increment, decrement } = this.props
    return (
      <div>
        <p>Counter: {counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    )
  }
}

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => bindActionCreators({ increment, decrement }, dispatch)
)(Counter)
