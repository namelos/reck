import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default actions =>
  connect(
    state => state,
    dispatch => bindActionCreators({ ...actions }, dispatch))
