import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createAction, createReducer, map } from './utils'

export default store => (reducerName, initialState, handlers) => {
  const namespace = `${reducerName}_`

  const nameHandlers = {}

  handlers::map((value, key) => {
    if (key.indexOf('_') === -1)
      nameHandlers[`${reducerName}_${key}`] = handlers[key]
    else
      nameHandlers[key] = handlers[key]
  })

  nameHandlers::map(handlerCallback => {
    if (typeof handlerCallback === 'function')
      return handlerCallback
    else
      return state => state
  })

  store.addReducer(reducerName, createReducer(initialState, nameHandlers))

  const actionTypes = Object.keys(nameHandlers)
  const actions = {}

  actionTypes.forEach(actionType => {
    const action = createAction(actionType)

    if (actionType.startsWith(namespace)) {
      actions[actionType.replace(namespace, '')] = action
    }

    actions[actionType] = action
  })

  return connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
  )
}
