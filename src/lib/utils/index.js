import { combineReducers } from 'redux'

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type))
      return handlers[action.type](state, action.payload)
    else
      return state
  }

export const createAction = type => payload => {
  console.log(`dispatching ${type}`)
  return { type, payload }
}

const _ = createReducer({}, {})

export const bindReducers = reducers =>
  combineReducers({_, ...reducers})

