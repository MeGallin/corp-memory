import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Dispatch Action

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

  return (
    <div className="login-wrapper">
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
    </div>
  );
};

export default Login;
