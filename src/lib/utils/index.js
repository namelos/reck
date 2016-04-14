import { combineReducers } from 'redux'

// export const map = (object, callback) => {
//   const keys = Object.keys(object)
//   const newValues = keys.forEach(key => object[key] = callback(object[key]))
//   return object
// }

export function map(callback) {
  const keys = Object.keys(this)
  const newValues = keys.forEach(key => this[key] = callback(this[key], key))
  return this
}

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

