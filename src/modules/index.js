import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-act'
import { addReducer } from '../libs'

const relux = (reducerName, initialState, handler, asyncHandler) => ComposedComponent => {
  

  addReducer(reducerName, handler, initialState)

  const actions = Object.keys(handler).map(createAction)

  return connect(
    state => state,
    dispatch => bindActionCreators({ ...actions, ...asyncHandler }, dispatch)
  )
}
