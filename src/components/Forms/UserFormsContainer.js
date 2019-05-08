import { connect } from "react-redux";

import UserForms from "./UserForms";
import * as userActions from "../../redux/user/userActions";

const mapStateToProps = state => ({
  active: state.control.initialized && !state.user.loggedIn,
  isSigningIn: state.control.isSigningIn,
  errors: state.user.errors
});

const mapDispatchToProps = dispatch => ({
  requestSignup: state =>
    dispatch(
      userActions.signupRequest(
        state.name,
        state.email,
        state.password,
        state.passwordConfirmation
      )
    ),
  requestLogin: state =>
    dispatch(userActions.loginRequest(state.email, state.password, false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForms);
