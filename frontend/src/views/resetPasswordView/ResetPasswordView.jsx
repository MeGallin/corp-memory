import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResetPasswordView.scss';

import InputFieldComponent from '../../components/inputField/inputFieldComponent';

import { updateUserPasswordAction } from '../../store/actions/userActions';

const ResetPasswordView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserPassword = useSelector((state) => state.updateUserPassword);
  const { success, error, message } = updateUserPassword;

  console.log('sss', updateUserPassword);

  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"£$%^&*()#~@])[A-Za-z\d!"£$%^&*()#~@]{6,}$/;
  const passwordConfirmRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"£$%^&*()#~@])[A-Za-z\d!"£$%^&*()#~@]{6,}$/;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMismatchMessage, setPwMismatchMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPwMismatchMessage('Passwords do not match');
    } else {
      // Dispatch registration data
      dispatch(
        updateUserPasswordAction({
          resetPasswordToken: params.token,
          password: password,
        }),
      );
      setPwMismatchMessage(null);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/forms');
      }, 6000);
    }
  };

  return (
    <div className="reset-pw-wrapper">
      {pwMismatchMessage ? pwMismatchMessage : null}
      {success ? (
        <>
          <h3>{message}</h3>
          <p>You will be direct shortly</p>
        </>
      ) : (
        <p>{error}</p>
      )}
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
