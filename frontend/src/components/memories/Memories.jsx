import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Memories.scss';

import moment from 'moment';

import { memoriesAction } from '../../store/actions/userActions';
import CreateMemory from '../createMemory/CreateMemory';
import DeleteMemory from '../deleteMemory/DeleteMemory';
import UpdateMemory from '../updateMemory/UpdateMemory';
import Tags from '../tags/Tags';

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
  const { loading, memories } = userMemories;

  return (
    <div className="memories-wrapper">
      {loading ? (
        'loading'
      ) : (
        <>
          {userInfo && memories ? (
            <div className="memories-inner-wrapper">
              <div className="item">
                <fieldset className="fieldSet">
                  <legend>Memories</legend>
                  <p>[{memories.length}] memories saved</p>
                  {memories?.map((memory) => (
                    <div className="memory" key={memory._id}>
                      <div className="memories-heading-wrapper">
                        <p
                          className={
                            moment(moment(memory.dueDate).valueOf()) <
                            moment(moment(new Date()).valueOf())
                              ? 'late'
                              : 'early'
                          }
                        >
                          Due, {moment(memory.dueDate, 'YYYYMMDD').fromNow()}
                        </p>
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

                      <h2>{memory.title}</h2>

                      <p>{memory.memory}</p>
                      <p className="small-text">
                        Due on, {moment(memory.dueDate).format('Do MMM YYYY')}
                      </p>
                      <p>Rating: {memory.rating}</p>

                      <div className="memory-button-wrapper">
                        <UpdateMemory updateMemory={{ ...memory }} />
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
                    </div>
                  ))}
                </fieldset>
              </div>
              <div className="item">
                <CreateMemory />
              </div>
            </div>
          ) : (
            <>
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
