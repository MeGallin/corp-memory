import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import './UpdateMemory.scss';

import { userUpdateAction } from '../../store/actions/userActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateMemory = ({ updateMemory }) => {
  const dispatch = useDispatch();
  // const [startDate] = useState(new Date()); //Set initial date here to show time!
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: updateMemory._id,
    title: updateMemory.title,
    memory: updateMemory.memory,
    dueDate: new Date(updateMemory.dueDate),
    rating: updateMemory.rating,
    tags: updateMemory.tags.map((tag) => tag.tagName),
  });
  const { id, title, memory, dueDate, rating, tags } = formData;

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
      tags: [],
    });
    setShowForm(false);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChangeDate = (date) => {
    setFormData({ id, title, memory, dueDate: date, rating, tags });
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

              <input
                type="text"
                id="tags"
                name="tags"
                value={tags}
                placeholder="Tags"
                onChange={handleOnchange}
              />

              <div>
                Set Reminder
                <DatePicker
                  selected={dueDate}
                  onChange={handleOnChangeDate}
                  minDate={new Date()}
                />
              </div>

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
