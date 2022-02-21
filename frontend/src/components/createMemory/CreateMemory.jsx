import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import './CreateMemory.scss';

import { createMemoryAction } from '../../store/actions/userActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateMemory = () => {
  const dispatch = useDispatch();
  const [startDate] = useState(new Date()); //Set initial date here to show time!
  const [formData, setFormData] = useState({
    title: '',
    memory: '',
    dueDate: startDate,
    rating: '',
  });
  const { title, memory, dueDate, rating } = formData;

  const handleCreateMemory = (e) => {
    e.preventDefault();
    //Dispatch Action
    dispatch(createMemoryAction(formData));
    setFormData({
      title: '',
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

  const handleOnChangeDate = (date) => {
    setFormData({ title, memory, dueDate: date, rating });
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
        </fieldset>
      )}
    </div>
  );
};

export default CreateMemory;
