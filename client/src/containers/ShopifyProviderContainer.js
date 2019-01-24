import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateShop } from '../actions';
import ShopifyProvider from '../components/ShopifyProvider';

const mapStateToProps = state => ({
  session: state.session,
  isLoading: state.isLoading.session,
});

const mapDispatchToProps = dispatch => ({
  updateShop: (session) => dispatch(updateShop(session)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopifyProvider));
