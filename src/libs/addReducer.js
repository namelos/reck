export default (store, name, reducer) => {
  store.reducers[name] = reducer
  store.replaceReducer(createReducer(store.reducers))
}