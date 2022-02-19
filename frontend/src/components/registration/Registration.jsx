import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import './Registration.scss';

import { registerAction } from '../../store/actions/userActions';

const Registration = () => {
  const dispatch = useDispatch();
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
        'loading'
      ) : (
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
      )}
    </div>
  );
};

export default Registration;
