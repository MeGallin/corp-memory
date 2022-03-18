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
          <Login />
          <p></p>
          <button onClick={() => setShowForm(!showForm)}>Register here</button>
        </>
      ) : (
        <>
          <Registration />
          <p></p>
          <button onClick={() => setShowForm(!showForm)}>login here</button>
        </>
      )}
    </div>
  );
};

export default FormsView;
