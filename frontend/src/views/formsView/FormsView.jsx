import { useState } from 'react';
import { useSelector } from 'react-redux';

import Login from '../../components/login/Login';
import Registration from '../../components/registration/Registration';
import './FormView.scss';

const FormsView = () => {
  const [showForm, setShowForm] = useState(true);

  const userRegistration = useSelector((state) => state.userRegistration);
  const { success } = userRegistration;

  return (
    <div className="forms-view-wrapper">
      {showForm || success ? (
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
          <Login />
          <p></p>
          Not a user yet?{' '}
          <button onClick={() => setShowForm(!showForm)}>REGISTER</button>
        </>
      ) : (
        <>
          <Registration />
          <p></p>
          Already a user?{' '}
          <button onClick={() => setShowForm(!showForm)}>LOGIN</button>
        </>
      )}
    </div>
  );
};

export default FormsView;
