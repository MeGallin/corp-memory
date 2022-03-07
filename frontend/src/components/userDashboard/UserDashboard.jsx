import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './UserDashboards.scss';
import { FaPencilAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

import { userDetailsUpdateAction } from '../../store/actions/userDetailActions';
import { userUpdateIsCompleteAction } from '../../store/actions/userActions';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [showCompleted, setShowCompleted] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;

  const userMemories = useSelector((state) => state.userMemories);
  const { memories } = userMemories;

  const completedMemories = memories?.filter((mem) => {
    if (mem.isComplete) return true;
    return false;
  });

  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    id: details?.id,
    name: details?.name,
    email: details?.email,
    password: '',
  });
  const { id, name, email, password } = formData;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading, success, error } = userUpdateDetails;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateMemory = (e) => {
    e.preventDefault();
    //Dispatch Action here
    dispatch(userDetailsUpdateAction(formData));
    setFormData({
      id: formData.id,
      name: formData.name,
      email: formData.email,
      password: '',
    });
  };

  const handleOnchangeIsComplete = (id, value) => {
    const toggledValue = (value = !value);
    setChecked((value = !value));
    //Dispatch setDueDate Action
    dispatch(userUpdateIsCompleteAction({ id: id, isComplete: toggledValue }));
  };

  return (
    <>
      {success ? 'Details have be successfully changed' : null}
      {error ? `Failed to update. ${error}` : null}
      {loading ? (
        'loading...'
      ) : (
        <div className="userDashboard-wrapper">
          <fieldset className="fieldSet">
            <legend>Completed Memories</legend>
            <div
              className="show-completed"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {!showCompleted
                ? `SHOW completed [${completedMemories?.length}]`
                : 'HIDE completed Memories'}
            </div>
            {showCompleted ? (
              <div>
                {completedMemories?.length > 0
                  ? completedMemories?.map((memory) => (
                      <div key={memory._id}>
                        <h4>{memory.title}</h4>
                        <p>{memory.memory}</p>
                        <div>
                          <label>
                            Un-mark as Completed:
                            <input
                              type="checkbox"
                              id="isComplete"
                              name="isComplete"
                              checked={checked ? checked : memory.isComplete}
                              onChange={() =>
                                handleOnchangeIsComplete(
                                  memory._id,
                                  memory.isComplete,
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </fieldset>
          <fieldset className="fieldSet">
            <legend>
              <FaPencilAlt style={{ fontSize: '10px', marginRight: '4px' }} />
              Update User Details
            </legend>
            <div>
              <p>Id: {id}</p>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>
                Admin:{' '}
                {details.isAdmin ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>
              <p>
                Email Confirmed:{' '}
                {details.isConfirmed ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>
            </div>

            <div>
              <form onSubmit={handleUpdateMemory}>
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
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={handleOnchange}
                />

                <button type="submit">UPDATE</button>
              </form>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
