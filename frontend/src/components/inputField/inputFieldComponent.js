import React, { useRef, useEffect, useState } from 'react';
import './InputFieldComponent.scss';
import PropTypes from 'prop-types';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputFieldComponent = ({
  type,
  label,
  name,
  value,
  placeholder,
  error,
  className,
  onChange,
}) => {
  const inputFocus = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [onlyPassword, setOnlyPassword] = useState(true);

  useEffect(() => {
    if (inputFocus.current.name === 'name') {
      inputFocus.current.focus();
    }
    if (inputFocus.current.type !== 'password') {
      setOnlyPassword(false);
    }
  }, [inputFocus]);

  const handleShowHidePw = () => {
    if (inputFocus.current.type === 'password') {
      setShowPassword((prevState) => !prevState);
      inputFocus.current.type = 'text';
    } else {
      setShowPassword((prevState) => !prevState);
      inputFocus.current.type = 'password';
    }
  };

  return (
    <div className="input-field-wrapper">
      {label && <label htmlFor="input-field">{label}</label>}
      <div className="input-icon-wrapper">
        <input
          ref={inputFocus}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          error={error}
          className={className}
          onChange={onChange}
        />

        {onlyPassword ? (
          <span onClick={() => handleShowHidePw()}>
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        ) : null}
      </div>

      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputFieldComponent.defaultProps = {
  type: 'text',
};

InputFieldComponent.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputFieldComponent;
