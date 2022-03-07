import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './ContactFrom.scss';

import { contactFormAction } from '../../store/actions/contactFormActions';
import InputFieldComponent from '../inputField/inputFieldComponent';

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const navigate = useNavigate();

  const contactForm = useSelector((state) => state.contactForm);
  const { error, success } = contactForm;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { name, email, message } = formData;

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, [success, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Dispatch Action
    dispatch(contactFormAction(name, email, message));

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="contact-form-wrapper">
      {error ? error : null}
      {success ? (
        'Your message has been successfully sent. Thank you. You will re-directed shortly.'
      ) : (
        <fieldset className="fieldSet">
          <legend>Contact Form</legend>
          <p>Please send us a message and we will be in contact shortly.</p>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <InputFieldComponent
                label="Name"
                value={name}
                type="text"
                name="name"
                required
                className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                error={
                  !nameRegEx.test(name) && name.length !== 0
                    ? `Name field must start with an uppercase letter and contain at least 3 letters and have no white space.`
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
              <textarea
                id="message"
                name="message"
                value={message}
                placeholder="message"
                onChange={handleOnchange}
              />

              <div>
                <button
                  type="submit"
                  disabled={!nameRegEx.test(name) || !emailRegEx.test(email)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default ContactForm;
