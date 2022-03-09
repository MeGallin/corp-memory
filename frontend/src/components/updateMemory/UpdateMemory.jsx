import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './UpdateMemory.scss';

import { userUpdateAction } from '../../store/actions/userActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputFieldComponent from '../inputField/inputFieldComponent';

const UpdateMemory = ({ updateMemory }) => {
  const dispatch = useDispatch();
  // const [startDate] = useState(new Date()); //Set initial date here to show time!
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: updateMemory._id,
    title: updateMemory.title,
    memory: updateMemory.memory,
    dueDate: new Date(updateMemory.dueDate),
    priority: updateMemory.priority,
    tags: updateMemory.tags[0]?.tagName || 'TAG',
  });
  const { id, title, memory, dueDate, priority, tags } = formData;

  const handleUpdateMemory = (e) => {
    e.preventDefault();

    //Dispatch Action here
    dispatch(userUpdateAction(formData));
    setFormData({
      title: '',
      memory: '',
      priority: '',
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
    setFormData({
      id,
      title,
      memory,
      dueDate: date,
      priority,
      tags: tags,
    });
  };

  return (
    <div className="update-memory-wrapper">
      {!showForm ? (
        <fieldset className="fieldSet">
          <legend>Update memory</legend>

          <div>
            <form onSubmit={handleUpdateMemory}>
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
              <div className="update-input-wrapper">
                <input
                  type="number"
                  id="priority"
                  name="priority"
                  value={priority}
                  placeholder="priority"
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

              <div className="update-memory-button-wrapper">
                <button
                  type="submit"
                  disabled={!title || !memory || memory.length < 3}
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      ) : null}
    </div>
  );
};

export default UpdateMemory;
