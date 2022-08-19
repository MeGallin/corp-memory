import React, { useState } from 'react';
import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import './ResetPassword.scss';

import { useDispatch, useSelector } from 'react-redux';

import { userForgotPasswordAction } from '../../store/actions/userActions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { success, error, message } = userForgotPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch Check email
    dispatch(userForgotPasswordAction(email));
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-wrapper">
      <fieldset className="fieldSet">
        <legend>Members forgot password form</legend>
        {error
          ? error
          : success
          ? 'Please check you email for a reset link.'
          : null}

        <div>
          <form onSubmit={handleSubmit}>
            <InputFieldComponent
              label="YOUR EMAIL"
              type="email"
              name="email"
              value={email}
              className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
              error={
                !emailRegEx.test(email) && email.length !== 0
                  ? `Invalid email address.`
                  : null
              }
              onChange={handleOnchange}
            />

            <div>
              <button type="submit" disabled={!emailRegEx.test(email)}>
                SUBMIT EMAIL
              </button>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default ResetPassword;
