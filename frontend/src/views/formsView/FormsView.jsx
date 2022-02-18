import { useState } from 'react';
import Login from '../../components/login/Login';
import Registration from '../../components/registration/Registration';
import './FormView.scss';

const FormsView = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="forms-view-wrapper">
      FormsView
      {showForm ? (
        <>
          <Login />
          <p onClick={() => setShowForm(!showForm)}>Register here</p>
        </>
      ) : (
        <>
          <Registration />
          <p onClick={() => setShowForm(!showForm)}>login here</p>
        </>
      )}
    </div>
  );
};

export default FormsView;
