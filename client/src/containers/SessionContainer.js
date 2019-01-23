import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Session from '../components/Session';
import { signUp } from '../actions';

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  signUp: session => dispatch(signUp(session)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Session));
