import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function inputNumber(evt) {
  if (
    (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
    evt.which > 57
  ) {
    evt.preventDefault();
  }
}

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  checkUserExists
}) => {
  let m_input;
  if (type === "number") {
    if (value === 0) {
      value = undefined;
    }

    m_input = (
      <div className={classnames("form-group group", { "has-error": error })}>
        <input
          onChange={onChange}
          onBlur={checkUserExists}
          value={value}
          type={type}
          name={field}
          onKeyPress={inputNumber}
          required
        />
        <span className="highlight" />
        <span className="bar" />

        <label>{label}</label>
        {error && <span className="help-block">{error}</span>}
      </div>
    );
  } else {
    m_input = (
      <div className={classnames("form-group group", { "has-error": error })}>
        <input
          onChange={onChange}
          onBlur={checkUserExists}
          value={value}
          type={type}
          name={field}
          required
        />
        <span className="highlight" />
        <span className="bar" />

        <label>{label}</label>
        {error && <span className="help-block">{error}</span>}
      </div>
    );
  }

  return m_input;
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
