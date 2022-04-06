import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminUsersMemories.scss';

import { adminUserMemoriesAction } from '../../store/actions/adminActions';

import moment from 'moment';

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
                <p>
                  Email:{' '}
                  <a href={`mailto:${user?.email}`} target="_blank">
                    {user?.name}
                  </a>{' '}
                  [{user?.email}]
                </p>
                <p>{user?.isConfirmed}</p>
                <p>{user?.isAdmin}</p>
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
                      {console.log(memory)}
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
