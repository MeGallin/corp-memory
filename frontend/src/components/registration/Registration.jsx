import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Registration.scss';

import { registerAction } from '../../store/actions/userActions';
import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';

const Registration = () => {
  const dispatch = useDispatch();
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const passwordConfirmRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const [pwMessage, setPwMessage] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, success } = userRegistration;

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    //Check that passwords match
    if (password === confirmPassword) {
      // Dispatch Action
      dispatch(registerAction(formData));

      setPwMessage(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setPwMessage(false);
    }
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="registration-wrapper">
      {error ? error : null}
      {success ? 'Registration has been successful' : null}
      {loading ? (
        <LoadingComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Registration</legend>

          {!pwMessage ? <p>Seems like your password's dont' match</p> : null}
          <div>
            <form onSubmit={handleRegistrationSubmit}>
              <InputFieldComponent
                label="Name"
                value={name}
                type="text"
                name="name"
                required
                className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                error={
                  !nameRegEx.test(name) && name.length !== 0
                    ? `Name field must contain a first name and surname both of which must start with a capital letter.`
                    : null
                }
                onChange={handleOnchange}
              />

              <InputFieldComponent
                label="Email"
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

              <InputFieldComponent
                label="Password"
                type="password"
                name="password"
                value={password}
                required
                className={
                  !passwordRegEx.test(password) ? 'invalid' : 'entered'
                }
                error={
                  !passwordRegEx.test(password) && password.length !== 0
                    ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                    : null
                }
                onChange={handleOnchange}
              />

              <InputFieldComponent
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                required
                className={
                  !passwordRegEx.test(confirmPassword) ? 'invalid' : 'entered'
                }
                error={
                  !passwordRegEx.test(confirmPassword) &&
                  confirmPassword.length !== 0
                    ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                    : null
                }
                onChange={handleOnchange}
              />

              <div>
                <button
                  type="submit"
                  disabled={
                    !nameRegEx.test(name) ||
                    !passwordRegEx.test(password) ||
                    !passwordConfirmRegEx.test(confirmPassword) ||
                    !emailRegEx.test(email)
                  }
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default Registration;
