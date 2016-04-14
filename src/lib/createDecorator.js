import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createAction, createReducer, map } from './utils'

const nameHandlers = (namespace, handlers) => {
  const namedHandlers = {}

  handlers::map((value, key) => {
    if (key.indexOf('_') === -1)
      namedHandlers[`${namespace}${key}`] = handlers[key]
    else
      namedHandlers[key] = handlers[key]
  })

  namedHandlers::map(handlerCallback => {
    if (typeof handlerCallback === 'function')
      return handlerCallback
    else
      return state => state
  })

  return namedHandlers
}

const nameActions = (namespace, namedHandlers) => {
  const actionTypes = Object.keys(namedHandlers)
  const actions = {}

  actionTypes.forEach(actionType => {
    const action = createAction(actionType)

    if (actionType.startsWith(namespace)) {
      actions[actionType.replace(namespace, '')] = action
    }

    actions[actionType] = action
  })

  return actions
}

const ahandlers = {
  async: (dispatch, getState) => {

  }
}

export default store => (reducerName, initialState, handlers) => {
  const namespace = `${reducerName}_`

  const namedHandlers = nameHandlers(namespace, handlers)

  const actions = nameActions(namespace, namedHandlers)

  store.addReducer(reducerName, createReducer(initialState, namedHandlers))

  const async = callback =>
    callback(store.dispatch, store.getState)

  return connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
  )
}
