import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { signUp } from '../actions';

const mapStateToProps = state => ({
  session: state.session,
  isLoading: state.isLoading.session,
});

const mapDispatchToProps = dispatch => ({
  signUp: session => dispatch(signUp(session)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
