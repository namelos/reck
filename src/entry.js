import React from 'react'
import { render } from 'react-dom'

// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'
//
// import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
// import { Provider, connect } from 'react-redux'
// import { reduxForm, reducer as form } from 'redux-form'
//
// import createLogger from 'redux-logger'
// import thunk from 'redux-thunk'
// import { createDevTools } from 'redux-devtools'
// import DockMonitor from 'redux-devtools-dock-monitor'
// import LogMonitor from 'redux-devtools-log-monitor'
//
// const logger = createLogger()
//
// const DevTools = createDevTools(
//   <DockMonitor toggleVisibilityKey='ctrl-h'
//                changePositionKey='ctrl-q'
//                defaultIsVisible={true}>
//     <LogMonitor />
//   </DockMonitor>
// )

// reducers

// const enhancer = compose(
//   compose(
//     applyMiddleware(thunk, logger),
//     DevTools.instrument()
//   )
// )
//
// const reducer = combineReducers({ routing, form })
//
// const store = enhancer(createStore)(reducer)
//
// render(
//   <Provider store={store}>
//     <div>
//       <DevTools />
//     </div>
//   </Provider>,
//   document.getElementById('app')
// )
render(
  <h1>test</h1>,
  document.getElementById('app')
)
