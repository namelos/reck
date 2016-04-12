import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import counter from './counter'
export { increment, decrement } from './counter'

export default combineReducers({
  routing,
  form,
  counter
})