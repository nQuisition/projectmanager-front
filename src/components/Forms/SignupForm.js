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
    name: "name",
    title: "Full Name",
    type: "text",
    placeholder: "Enter your name",
    validate: state =>
      state.name.length > 0 ? false : "Name must be non-empty"
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your password",
    validate: state =>
      state.password.length > 0 ? false : "Password must be non-empty"
  },
  {
    name: "passwordConfirmation",
    title: "Retype Password",
    type: "password",
    placeholder: "Enter your password again",
    validate: state =>
      state.password === state.passwordConfirmation
        ? false
        : "Passwords do not match"
  }
];

function SignupForm({ active, error, requestSignup }) {
  return (
    <Form
      fields={fields}
      active={active}
      error={error}
      buttonName="Sign Up"
      onSubmit={requestSignup}
    />
  );
}

export default SignupForm;
