import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Memories.scss';

import { memoriesAction } from '../../store/actions/userActions';
import CreateMemory from '../createMemory/CreateMemory';
import DeleteMemory from '../deleteMemory/DeleteMemory';
import UpdateMemory from '../updateMemory/UpdateMemory';

const Memories = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(memoriesAction());
    }
  }, [userInfo, dispatch]);

  const userMemories = useSelector((state) => state.userMemories);
  const { loading, success, error, memories } = userMemories;

  return (
    <div className="memories-wrapper">
      {error ? error : null}
      {success ? 'Registration has been successful' : null}
      {loading ? (
        'loading'
      ) : (
        <>
          {userInfo && memories ? (
            <div className="memories-inner-wrapper">
              <div>
                <fieldset className="fieldSet">
                  <legend>Memories</legend>

                  {memories?.map((memory) => (
                    <div key={memory._id}>
                      <p>{memory._id}</p>
                      <p>{memory.memory}</p>
                      <p>{memory.rating}</p>
                      <DeleteMemory id={memory._id} />
                      <UpdateMemory updateMemory={{ ...memory }} />
                      <hr />
                    </div>
                  ))}
                </fieldset>
              </div>

              <CreateMemory />
            </div>
          ) : (
            <>
              <h1>Home page data</h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Memories;
