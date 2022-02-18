import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

import './Registration.scss';

const Registration = () => {
  const [pwMessage, setPwMessage] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    //Check that passwords match
    if (password === confirmPassword) {
      console.log(formData);
      // Dispatch Action

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
      <fieldset className="fieldSet">
        <legend>
          <FaUser />
          Registration
        </legend>
        <p>Please create an account.</p>
        {!pwMessage ? <p>Seems like your password's dont' match</p> : null}
        <div>
          <form onSubmit={handleRegistrationSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={handleOnchange}
            />

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
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="confirmPassword"
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

export default Registration;
