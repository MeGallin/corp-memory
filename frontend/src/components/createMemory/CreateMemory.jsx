import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateMemory.scss';

import { createMemoryAction } from '../../store/actions/userActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputFieldComponent from '../inputField/inputFieldComponent';

const CreateMemory = () => {
  const dispatch = useDispatch();
  const [startDate] = useState(new Date()); //Set initial date here to show time!
  const [formData, setFormData] = useState({
    title: '',
    memory: '',
    dueDate: startDate,
    rating: '',
    tags: [],
  });
  const { title, memory, dueDate, rating, tags } = formData;

  const handleCreateMemory = (e) => {
    e.preventDefault();
    //Dispatch Action
    dispatch(createMemoryAction(formData));
    setFormData({
      title: '',
      memory: '',
      rating: '',
      tags: [],
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
    setFormData({ title, memory, dueDate: date, rating, tags });
  };

  return (
    <div className="create-memory-wrapper">
      {success ? 'Memory successfully created' : null}
      {loading ? (
        'loading...'
      ) : (
        <fieldset className="fieldSet">
          <legend>Create a new memory</legend>

          <div>
            <form onSubmit={handleCreateMemory}>
              <InputFieldComponent
                label="Title"
                value={title}
                type="text"
                name="title"
                onChange={handleOnchange}
              />
              <p className="small-text">
                Memory needs to have at least 5 characters [{memory.length}]
              </p>
              <textarea
                id="memory"
                name="memory"
                value={memory}
                placeholder="memory"
                onChange={handleOnchange}
              />

              <div className="create-input-wrapper">
                <div>
                  <label>
                    Rating
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={rating}
                      min="1"
                      max="10"
                      onChange={handleOnchange}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  placeholder="Tags"
                  onChange={handleOnchange}
                />
              </div>

              <div>
                Set Reminder
                <DatePicker
                  selected={dueDate}
                  onChange={handleOnChangeDate}
                  minDate={new Date()}
                  showTimeInput
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!title || !memory || memory.length < 3}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default CreateMemory;
