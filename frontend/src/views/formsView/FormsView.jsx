import { useState } from 'react';
import Login from '../../components/login/Login';
import Registration from '../../components/registration/Registration';
import './FormView.scss';

const FormsView = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="forms-view-wrapper">
      {showForm ? (
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
