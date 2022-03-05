import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ContactFrom.scss';

import { contactFormAction } from '../../store/actions/contactFormActions';

const ContactForm = () => {
  const dispatch = useDispatch();

  const contactForm = useSelector((state) => state.contactForm);
  const { loading, error, success } = contactForm;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { name, email, message } = formData;
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
      {success ? 'Your message has been successfully sent. Thank you' : null}
      {loading ? (
        'loading'
      ) : (
        <fieldset className="fieldSet">
          <legend>Contact Form</legend>
          <p>Please send us a message and we will be in contact shortly.</p>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="name"
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
              <textarea
                id="message"
                name="message"
                value={message}
                placeholder="message"
                onChange={handleOnchange}
              />

              <div>
                <button type="submit" disabled={!name && !email && !message}>
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
