import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResetPasswordView.scss';

import InputFieldComponent from '../../components/inputField/inputFieldComponent';

import { updateUserPasswordAction } from '../../store/actions/userActions';

const ResetPasswordView = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"£$%^&*()#~@])[A-Za-z\d!"£$%^&*()#~@]{6,}$/;
  const passwordConfirmRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"£$%^&*()#~@])[A-Za-z\d!"£$%^&*()#~@]{6,}$/;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch registration data
      dispatch(
        updateUserPasswordAction({
          resetPasswordToken: params.token,
          password: password,
        }),
      );
      setMessage(null);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="reset-pw-wrapper">
      {message ? message : null}
      <fieldset className="fieldSet">
        <legend>
          Members <span>Reset Password</span> form
        </legend>
        <form onSubmit={handleSubmit}>
          <InputFieldComponent
            label="Password"
            type="password"
            name={password}
            value={password}
            required
            className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
            error={
              !passwordRegEx.test(password) && password.length !== 0
                ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                : null
            }
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputFieldComponent
            label="Confirm Password"
            type="password"
            name={confirmPassword}
            value={confirmPassword}
            required
            className={
              !passwordConfirmRegEx.test(confirmPassword)
                ? 'invalid'
                : 'entered'
            }
            error={
              !passwordConfirmRegEx.test(confirmPassword) &&
              confirmPassword.length !== 0
                ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                : null
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={
              !passwordRegEx.test(password) ||
              !passwordConfirmRegEx.test(confirmPassword)
            }
          >
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default ResetPasswordView;
