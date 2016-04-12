import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

export { default as DevTools } from './dev-tools'
export { Counter } from './counter'
import counter from './counter'

export default combineReducers({
  routing,
  form,
  counter
})

