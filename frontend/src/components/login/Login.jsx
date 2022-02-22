import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';
import './Login.scss';

import { loginAction } from '../../store/actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        'loading'
      ) : (
        <fieldset className="fieldSet">
          <legend>
            <FaUser />
            Login
          </legend>
          <p>Please log into your account</p>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={handleOnchange}
              />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleOnchange}
              />

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default Login;
