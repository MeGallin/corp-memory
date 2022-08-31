import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Memories.scss';

import moment from 'moment';

import {
  memoriesAction,
  userUpdateSetDueDateAction,
  userUpdateIsCompleteAction,
} from '../../store/actions/userActions';
import { detailsAction } from '../../store/actions/userDetailActions';

import { FaPencilAlt, FaSortUp, FaSortDown, FaUpload } from 'react-icons/fa';
import CreateMemory from '../createMemory/CreateMemory';
import DeleteMemory from '../deleteMemory/DeleteMemory';
import UpdateMemory from '../updateMemory/UpdateMemory';
import Tags from '../tags/Tags';
import SearchComponent from '../searchComponent/SearchComponent';
import Modal from '../modal/Modal';
import StarComponent from '../starComponent/StarComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import MemoriesImages from '../memoriesImages/MemoriesImages';

const Memories = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [dateTime, setDateTime] = useState('');

  const [showMemoryImageUpload, setShowMemoryImageUpload] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(memoriesAction());
      dispatch(detailsAction());
    }
    setInterval(() => {
      setDateTime(moment().valueOf());
    }, 1000);
  }, [userInfo, dispatch]);

  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;

  const userMemories = useSelector((state) => state.userMemories);
  const { loading, memories } = userMemories;

  //SORT
  const [sortedMemories, setSortedMemories] = useState(memories);
  //SORT
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleOnchangeChecked = (id, value) => {
    const toggledValue = (value = !value);
    //Dispatch setDueDate Action
    dispatch(userUpdateSetDueDateAction({ id: id, setDueDate: toggledValue }));
  };

  const handleOnchangeIsComplete = (id, value) => {
    const toggledValue = (value = !value);
    //Dispatch setDueDate Action
    dispatch(userUpdateIsCompleteAction({ id: id, isComplete: toggledValue }));
  };

  const completedMemories = memories?.filter((memory) => {
    if (memory.isComplete) {
      return memory;
    }
    return false;
  });

  //Search
  const searchedMemories = memories?.filter((memory) => {
    if (memory.title !== undefined || memory.memory !== undefined) {
      return (
        memory.title.toLowerCase().includes(keyword.toLowerCase()) ||
        memory.memory.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return false;
  });
  //Search
  // SORT
  const sortByDueDateNewest = (a, b) => {
    return moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf();
  };
  const sortByDueDateOldest = (a, b) => {
    return moment(b.dueDate).valueOf() - moment(a.dueDate).valueOf();
  };
  const handleSort = (val) => {
    const sortedMemories = [...memories];
    switch (val) {
      case 'UP':
        memories.sort(sortByDueDateNewest);
        break;
      case 'DOWN':
        memories.sort(sortByDueDateOldest);
        break;
      default:
        break;
    }
    setSortedMemories(sortedMemories);
  };
  useEffect(() => {
    setSortedMemories(sortedMemories);
  }, [sortedMemories]);
  // SORT

  const [showMemoryId, setShowMemoryId] = useState('');
  const handleShowIcon = (memoryId) => {
    setShowMemoryId(memoryId);
    setShowMemoryImageUpload(!showMemoryImageUpload);
  };

  return (
    <div className="memories-wrapper">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {userInfo && searchedMemories && details?.isConfirmed ? (
            <div className="memories-inner-wrapper">
              <fieldset className="fieldSet">
                <legend>Memories</legend>

                <div className="search-modal-wrapper">
                  <div className="search-sort-wrapper">
                    <SearchComponent
                      placeholder="search"
                      value={keyword}
                      handleSearch={handleSearch}
                    />
                    <div>
                      <div>
                        <div
                          title="Sort By Latest"
                          className="memory-sort"
                          onClick={() => handleSort('UP')}
                        >
                          <FaSortUp />
                        </div>
                        <div
                          title="Sort By Oldest"
                          className="memory-sort"
                          onClick={() => handleSort('DOWN')}
                        >
                          <FaSortDown />
                        </div>
                      </div>
                    </div>
                  </div>
                  {!details?.isSuspended ? (
                    <Modal
                      className="create-btn"
                      openButtonTitle="Create"
                      closeButtonTitle="X"
                      props={<CreateMemory />}
                    />
                  ) : (
                    <div>
                      <h3>'Your account has been suspended'</h3>
                      <h5>Please contact ADMIN</h5>
                    </div>
                  )}
                </div>

                <p>
                  [{searchedMemories.length}]{' '}
                  {searchedMemories.length === 1 ? 'memory found.' : 'memories'}{' '}
                  and [{completedMemories.length}] marked as complete.
                </p>
                <div className="mem-wrapper">
                  {searchedMemories?.map((memory) => (
                    <div
                      className={`memory ${
                        moment(memory.dueDate).valueOf() < dateTime
                          ? 'late-border'
                          : 'early-border'
                      } ${memory.isComplete ? 'late-width' : ''} ${
                        !memory.setDueDate ? 'set-due-date' : ''
                      }`}
                      key={memory._id}
                    >
                      <fieldset className="fieldSet">
                        <legend>{memory.title}</legend>

                        {!memory.isComplete ? (
                          <>
                            <div className="memories-heading-wrapper">
                              {memory.setDueDate ? (
                                <p
                                  className={
                                    moment(memory.dueDate).valueOf() < dateTime
                                      ? 'late late-border'
                                      : 'small-text early'
                                  }
                                >
                                  Due,{' '}
                                  {moment(memory.dueDate)
                                    .startOf('minute')
                                    .fromNow()}
                                </p>
                              ) : (
                                <div className="small-text">
                                  No due date set
                                </div>
                              )}

                              {memory.tags.map((tag) => (
                                <div key={tag._id}>
                                  <Tags
                                    tag={tag.tagName}
                                    urgency="danger"
                                    id={memory._id}
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="memory-inner-wrapper">
                              <div>
                                <div className="memory-title-wrapper">
                                  <h2>{memory.title}</h2>
                                </div>
                                <p>{memory.memory}</p>
                                {new Array(memory.priority)
                                  .fill(null)
                                  .map((num, i) => (
                                    <StarComponent key={i} />
                                  ))}
                              </div>

                              <div className="memory-show-wrapper">
                                {memory.memoryImage ||
                                (showMemoryImageUpload &&
                                  memory._id === showMemoryId) ? (
                                  <div className="memory-show-inner-wrapper">
                                    <MemoriesImages
                                      memoryId={memory._id}
                                      memoryImage={memory.memoryImage}
                                    />
                                  </div>
                                ) : null}
                                <div
                                  className="upload-wrapper"
                                  onClick={() => handleShowIcon(memory._id)}
                                >
                                  {!memory.memoryImage ? (
                                    <>
                                      <FaUpload
                                        size={22}
                                        title="Upload an Image"
                                        className="upload-icon"
                                      />
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="memories-priority-wrapper small-text">
                              <label>
                                Set Due Date:
                                <input
                                  type="checkbox"
                                  id="setDueDate"
                                  name="setDueDate"
                                  checked={memory.setDueDate}
                                  onChange={() =>
                                    handleOnchangeChecked(
                                      memory._id,
                                      memory.setDueDate,
                                    )
                                  }
                                />
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  id="isComplete"
                                  name="isComplete"
                                  checked={memory.isComplete}
                                  onChange={() =>
                                    handleOnchangeIsComplete(
                                      memory._id,
                                      memory.isComplete,
                                    )
                                  }
                                />
                                Mark as Complete.
                              </label>
                            </div>

                            {memory.setDueDate ? (
                              <p className="small-text">
                                Due on,{' '}
                                {moment(memory.dueDate).format(
                                  'Do MMM YYYY, h:mm:ss a',
                                )}
                              </p>
                            ) : null}

                            <div className="memory-button-wrapper">
                              <Modal
                                openButtonTitle={
                                  <>
                                    <FaPencilAlt
                                      style={{
                                        fontSize: '10px',
                                        marginRight: '4px',
                                      }}
                                    />
                                    EDIT
                                  </>
                                }
                                closeButtonTitle="X"
                                props={
                                  <UpdateMemory updateMemory={{ ...memory }} />
                                }
                              />

                              <DeleteMemory id={memory._id} />
                            </div>
                            <div className="created-updated-wrapper">
                              <p>
                                Created on,{' '}
                                {moment(memory.createdAt).format('Do MMM YYYY')}
                              </p>
                              <p>
                                Updated on,{' '}
                                {moment(memory.updatedAt).format('Do MMM YYYY')}
                              </p>
                            </div>
                          </>
                        ) : null}
                      </fieldset>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            <>
              {!details?.isConfirmed && userInfo ? (
                <div className="memories-confirmation-error">
                  <p>ERROR: Your email address need to be confirmed.</p>
                  <p>Please check you emails for our confirmation link.</p>
                  <p>
                    Click the link and you will redirected to a new page where
                    you can log in again.
                  </p>
                </div>
              ) : null}
              <h1>Corporate memory</h1>
              <p>
                Corporate memory is the ability of an organization to retain
                information to improve strategy, decision making, problem
                solving, operations and design. An organization with low
                corporate memory is doomed to repeat the same mistakes and
                reinvent things repeatedly in a costly loop. The following are
                the basic components of corporate memory.
              </p>
              <h2>Knowledge</h2>
              <p>
                The abilities and knowledge of your employees. Generally
                speaking, when people leave corporate memory is lost. That is to
                say that there is always information that isn't transfered or
                retained such as tacit knowledge and situational knowledge. For
                example, a salesperson who has figured out an effective method
                for selling to a particular executive might be unlikely to
                communicate the approach to someone who could replicate it.
              </p>
              <h2>Information</h2>
              <p>
                Data designed to be consumed by people. For example, a design
                document or a training video. It is common for knowledge workers
                to produce copious amounts of documentation that is archived in
                a tool such as a knowledge management platform. It is also
                common for such information to go to waste or for similar
                documentation efforts to be repeated many times.
              </p>
              <h2>Data</h2>
              <p>
                Information designed to be consumed by machine. Automation and
                decision support based on databases is a type of corporate
                memory that survives employee turnover. In some cases, replacing
                systems and changing processes results in data going dark.
              </p>
              <h2>Organizational Culture</h2>
              <p>
                The norms, habits and expectations of a firm. As with the
                culture of a nation, this is rooted in history and serves as a
                stabilizing force that doesn't easily change.
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Memories;
