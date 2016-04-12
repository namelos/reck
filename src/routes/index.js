import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'

export default store =>
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Index }>
      </Route>
    </Router>
  </Provider>