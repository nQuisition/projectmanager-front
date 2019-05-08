import React from "react";
import PropTypes from "prop-types";

import Form from "./Form";
import { validateEmail } from "../../utils/utils";

const fields = [
  {
    name: "email",
    title: "Email Address",
    type: "text",
    placeholder: "Enter your email address",
    validate: state => validateEmail(state.email)
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your password",
    validate: state =>
      state.password.length > 0 ? false : "Password must be non-empty"
  }
];

function LoginForm({ active, error, requestLogin }) {
  return (
    <Form
      fields={fields}
      active={active}
      error={error}
      buttonName="Log In"
      onSubmit={requestLogin}
    />
  );
}

export default LoginForm;
