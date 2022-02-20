import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import './CreateMemory.scss';

import { createMemoryAction } from '../../store/actions/userActions';

const CreateMemory = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    memory: '',
    rating: '',
  });
  const { memory, rating } = formData;

  const handleCreateMemory = (e) => {
    e.preventDefault();

    dispatch(createMemoryAction(formData));
    setFormData({
      memory: '',
      rating: '',
    });
  };

  const userCreateMemory = useSelector((state) => state.userCreateMemory);
  const { loading, success } = userCreateMemory;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="create-memory-wrapper">
      {success ? 'Memory successfully created' : null}
      {loading ? (
        'loading...'
      ) : (
        <fieldset className="fieldSet">
          <legend>
            <FaUser />
            Create a new memory
          </legend>

          <div>
            <form onSubmit={handleCreateMemory}>
              <textarea
                id="memory"
                name="memory"
                value={memory}
                placeholder="memory"
                onChange={handleOnchange}
              />

              <input
                type="number"
                id="rating"
                name="rating"
                value={rating}
                placeholder="rating"
                onChange={handleOnchange}
              />

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default CreateMemory;
