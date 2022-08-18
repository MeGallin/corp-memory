import { useState } from 'react';
import { useSelector } from 'react-redux';

import Login from '../../components/login/Login';
import Registration from '../../components/registration/Registration';
import ResetPassword from '../../components/resetPassword/ResetPassword';
import './FormView.scss';

const FormsView = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const userRegistration = useSelector((state) => state.userRegistration);
  const { success } = userRegistration;

  return (
    <div className="forms-view-wrapper">
      <>
        {success ? (
          <>
            <h3>Please note:</h3>
            <p>
              Please check you emails. You need to confirm you email address
              before logging into your account.
            </p>
            <p>
              You will need to do this in order to gain full functionality to
              the application.
            </p>
          </>
        ) : null}
        {!showRegistrationForm && !showResetPasswordForm ? (
          <>
            <Login />
            <p></p>
            <div className="button-wrapper">
              <div>
                Not a user yet?{' '}
                <button
                  onClick={() => setShowRegistrationForm(!showRegistrationForm)}
                >
                  REGISTER
                </button>
              </div>
              <div>
                Forgot your password?{' '}
                <button
                  onClick={() =>
                    setShowResetPasswordForm(!showResetPasswordForm)
                  }
                >
                  REST PASSWORD
                </button>
              </div>
            </div>
          </>
        ) : null}
      </>

      {showRegistrationForm ? (
        <>
          <Registration />
          <p></p>
          Already a user?{' '}
          <button
            onClick={() => setShowRegistrationForm(!showRegistrationForm)}
          >
            LOGIN
          </button>
        </>
      ) : null}

      {showResetPasswordForm ? (
        <>
          <ResetPassword />
          Got back to login?{' '}
          <button
            onClick={() => setShowResetPasswordForm(!showResetPasswordForm)}
          >
            LOGIN
          </button>
        </>
      ) : null}
    </div>
  );
};

export default FormsView;
