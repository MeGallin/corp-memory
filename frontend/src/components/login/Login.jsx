import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.scss';

import { loginAction } from '../../store/actions/userActions';
import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Dispatch Action
    dispatch(loginAction(email, password));

    setFormData({
      email: '',
      password: '',
    });
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  return (
    <div className="login-wrapper">
      {error ? error : null}
      {success ? 'You have successfully logged in' : null}
      {loading ? (
        <LoadingComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Login</legend>

          <div>
            <form onSubmit={handleLoginSubmit}>
              <InputFieldComponent
                label="Email"
                type="email"
                name="email"
                value={email}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                // error={
                //   !emailRegEx.test(email) && email.length !== 0
                //     ? `Invalid email address.`
                //     : null
                // }
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
                // error={
                //   !passwordRegEx.test(password) && password.length !== 0
                //     ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                //     : null
                // }
                onChange={handleOnchange}
              />

              <div>
                <button
                  type="submit"
                  // disabled={
                  //   !passwordRegEx.test(password) || !emailRegEx.test(email)
                  // }
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default Login;
