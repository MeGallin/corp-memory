import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import './UpdateMemory.scss';

import { userUpdateAction } from '../../store/actions/userActions';

const UpdateMemory = ({ updateMemory }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: updateMemory._id,
    title: updateMemory.title,
    memory: updateMemory.memory,
    rating: updateMemory.rating,
  });
  const { title, memory, rating } = formData;

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleUpdateMemory = (e) => {
    e.preventDefault();

    //Dispatch Action here
    dispatch(userUpdateAction(formData));
    setFormData({
      title: '',
      memory: '',
      rating: '',
    });
    setShowForm(false);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="update-memory-wrapper">
      <button onClick={() => handleShowForm(memory)}>Edit Memory</button>

      {showForm ? (
        <fieldset className="fieldSet">
          <legend>
            <FaUser />
            Update memory
          </legend>

          <div>
            <form onSubmit={handleUpdateMemory}>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="title"
                onChange={handleOnchange}
              />

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
          <button onClick={() => setShowForm(false)}>Cancel Update</button>
        </fieldset>
      ) : null}
    </div>
  );
};

export default UpdateMemory;
