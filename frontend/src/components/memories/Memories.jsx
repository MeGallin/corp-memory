import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Memories.scss';

import { memoriesAction } from '../../store/actions/userActions';

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
        loading
      ) : (
        <>
          {userInfo && memories ? (
            memories?.map((memory) => (
              <div key={memory._id}>
                {console.log('DDD', memory)}
                <h1>Memories</h1>
                <p>{memory.memory}</p>
                <p>{memory.rating}</p>
              </div>
            ))
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
