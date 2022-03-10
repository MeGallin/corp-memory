import { useDispatch, useSelector } from 'react-redux';

import './DeleteMemory.scss';
import { FaTrash } from 'react-icons/fa';

import { deleteMemoryAction } from '../../store/actions/userActions';
import LoadingComponent from '../loadingComponent/LoadingComponent';

const DeleteMemory = ({ id }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      dispatch(deleteMemoryAction(id));
    }
  };
  const userDeleteMemory = useSelector((state) => state.userDeleteMemory);
  const { loading, error } = userDeleteMemory;

  return (
    <div className="delete-memory-wrapper">
      {error ? error : null}

      {loading ? (
        <LoadingComponent />
      ) : (
        <button id={id} onClick={() => handleDelete(id)}>
          <FaTrash style={{ fontSize: '10px', marginRight: '4px' }} />
          DELETE
        </button>
      )}
    </div>
  );
};

export default DeleteMemory;
