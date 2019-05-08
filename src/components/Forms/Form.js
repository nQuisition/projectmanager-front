import React from "react";
import PropTypes from "prop-types";

import formStyles from "./Form.module.scss";

import Input from "../FormElements/Input";
import * as Button from "../FormElements/Button";
import Spinner, {
  SIZES as SPINNER_SIZES,
  POSITIONING as SPINNER_POSITIONING
} from "../Spinner/Spinner";
import { capitalize } from "../../utils/utils";

export default class Form extends React.Component {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        // TODO change to oneOf
        type: PropTypes.string,
        title: PropTypes.string,
        placeholder: PropTypes.string,
        validate: PropTypes.func
      })
    ),
    active: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
      extraData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    }),
    buttonName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    active: false
  };

  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = fields.reduce((obj, field) => {
      obj[field.name] = field.initialValue || "";
      obj[`was${capitalize(field.name)}Blured`] = false;
      return obj;
    }, {});

    this.state.activeInput = null;

    fields.forEach(field => {
      const { name } = field;
      const capName = capitalize(name);

      const changeHandler = e => {
        this.setState({ [name]: e.target.value });
      };
      const blurHandler = () => {
        this.setState(state => {
          const result = {};
          if (!state[`was${capName}Blured`]) {
            result[`was${capName}Blured`] = true;
          }
          if (state.activeInput === name) {
            result.activeInput = null;
          }
          return result;
        });
      };
      const focusHandler = () => {
        this.setState(state => ({ activeInput: name }));
      };
      this[`handle${capName}Change`] = changeHandler.bind(this);
      this[`on${capName}Blur`] = blurHandler.bind(this);
      this[`on${capName}Focus`] = focusHandler.bind(this);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { active, error, buttonName } = this.props;
    let errorMessage = null;
    const errorAnnotations =
      error && error.extraData
        ? Object.keys(error.extraData).reduce((obj, key) => {
            obj[key] = error.extraData[key].join(" ");
            return obj;
          }, {})
        : {};
    if (error) {
      errorMessage = <div>{error.message}</div>;
    }
    const spinner = active ? null : (
      <Spinner
        spinnerSize={SPINNER_SIZES.SMALL}
        positioning={SPINNER_POSITIONING.ABSOLUTE}
      />
    );
    let allValid = true;
    const inputs = this.props.fields.map(field => {
      const { name, type, title, placeholder, validate } = field;
      const capName = capitalize(name);
      const invalidMessage = validate && validate(this.state);
      // TODO modifying var within "map" - no good?
      allValid = allValid && !invalidMessage;
      const validationError =
        this.state[`was${capName}Blured`] && invalidMessage;
      const shouldDisplayError =
        (this.state.activeInput !== name && !!validationError) ||
        !!errorAnnotations[name];
      const isComplete =
        this.state[`was${capName}Blured`] &&
        this.state.activeInput !== name &&
        !shouldDisplayError;
      return (
        <Input
          key={name}
          type={type || "text"}
          title={title}
          name={name}
          value={this.state[name]}
          placeholder={placeholder}
          handleChange={this[`handle${capName}Change`]}
          isError={shouldDisplayError}
          isComplete={isComplete}
          innerAnnotation={
            (shouldDisplayError &&
              (validationError || errorAnnotations[name])) ||
            (this.state[name] && this.state[name].length > 0
              ? placeholder
              : null)
          }
          handleBlur={this[`on${capName}Blur`]}
          handleFocus={this[`on${capName}Focus`]}
        />
      );
    });
    return (
      <form
        className={formStyles.form}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        {inputs}
        <div className={formStyles.buttonsContainer}>
          <Button.Primary
            text={buttonName}
            innerComponent={spinner}
            type="submit"
            disabled={!active || !allValid}
          />
        </div>
        {errorMessage}
      </form>
    );
  }
}
