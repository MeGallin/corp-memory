import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminUsersMemories.scss';

import {
  adminUserMemoriesAction,
  adminSuspendUserAction,
} from '../../store/actions/adminActions';

import moment from 'moment';

import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AdminUsersMemories = () => {
  const dispatch = useDispatch();

  const adminUserMemories = useSelector((state) => state.adminUserMemories);
  const { loading, success, error, usersMemories } = adminUserMemories;

  useEffect(() => {
    dispatch(adminUserMemoriesAction());
  }, [dispatch]);

  const memories = usersMemories?.filter((memory) => {
    if (memory.user) {
      return memory;
    }
    return false;
  });
  const users = usersMemories?.filter((user) => {
    if (!user.user) {
      return user;
    }
    return false;
  });

  const handleSuspend = (id, isSuspended) => {
    //Dispatch Action here
    dispatch(adminSuspendUserAction({ id, isSuspended }));
  };

  return (
    <div className="admin-users-memories-wrapper">
      {error ? error : success}
      {loading ? (
        '...loading'
      ) : (
        <>
          {users?.map((user) => (
            <div key={user?._id} className="inner-wrapper">
              <>
                <h2>{user?.name}</h2>

                {user?.isSuspended ? (
                  <button onClick={() => handleSuspend(user?._id, false)}>
                    UN-SUSPEND
                  </button>
                ) : (
                  <button onClick={() => handleSuspend(user?._id, true)}>
                    SUSPEND
                  </button>
                )}

                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${user?.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user?.name}
                  </a>{' '}
                  [{user?.email}]
                </p>
                <p>
                  Admin: {user?.isAdmin ? <FaThumbsUp /> : <FaThumbsDown />}
                </p>
                <p>
                  Confirmed:{' '}
                  {user?.isConfirmed ? <FaThumbsUp /> : <FaThumbsDown />}
                </p>

                <p>
                  Suspended:{' '}
                  {user?.isSuspended ? <FaThumbsUp /> : <FaThumbsDown />}
                </p>

                <p>
                  Created: {moment(user?.createdAt).startOf('minute').fromNow()}
                </p>
                <p>
                  Updated: {moment(user?.updatedAt).startOf('minute').fromNow()}
                </p>
              </>

              {memories?.map((memory) => (
                <div key={memory?._id}>
                  {user?._id === memory?.user ? (
                    <>
                      <h3>{memory?.title}</h3>
                      <p>{memory.memory}</p>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminUsersMemories;
