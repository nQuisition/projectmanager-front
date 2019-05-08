import React from "react";
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as styles from "./UserForm.module.scss";
import * as boxStyles from "../Elements/Box.module.scss";

export default class UserForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: "login"
    };
  }

  toLoginView = () => {
    this.setState({ activeView: "login" });
  };
  toSignupView = () => {
    this.setState({ activeView: "signup" });
  };

  render() {
    const {
      active,
      isSigningIn,
      errors,
      requestLogin,
      requestSignup
    } = this.props;
    if (!active) {
      return null;
    }
    const activeForm =
      this.state.activeView === "login" ? (
        <LoginForm
          active={!isSigningIn}
          error={errors.login}
          requestLogin={requestLogin}
        />
      ) : (
        <SignupForm
          active={!isSigningIn}
          error={errors.signup}
          requestSignup={requestSignup}
        />
      );
    // TODO tabs should be buttons/links
    return (
      <div className={[styles.userForm, boxStyles.baseBox].join(" ")}>
        <div className={styles.tabsHeader}>
          <div
            className={[
              styles.tabButton,
              this.state.activeView === "login" ? styles.active : ""
            ].join(" ")}
            onClick={this.toLoginView}
          >
            <span className={styles.tabButtonInner}>Log In</span>
          </div>
          <div
            className={[
              styles.tabButton,
              this.state.activeView !== "login" ? styles.active : ""
            ].join(" ")}
            onClick={this.toSignupView}
          >
            <span className={styles.tabButtonInner}>Sign Up</span>
          </div>
        </div>
        {activeForm}
      </div>
    );
  }
}
