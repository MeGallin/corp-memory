import './Tags.scss';
import { useDispatch, useSelector } from 'react-redux';

import { deleteMemoryTagAction } from '../../store/actions/userActions';

const Tags = ({ id, tag, urgency }) => {
  const dispatch = useDispatch();

  const userDeleteMemoryTag = useSelector((state) => state.userDeleteMemoryTag);
  const { loadingTag } = userDeleteMemoryTag;

  const handleDeleteTag = (id) => {
    //Dispatch Action here
    dispatch(deleteMemoryTagAction(id));
  };
  return (
    <>
      {loadingTag ? (
        loadingTag
      ) : (
        <div className={`tags-wrapper ${urgency}`}>
          {tag}
          <span
            className="tag-x"
            onClick={() => handleDeleteTag(id)}
            title="Delete Tag"
          >
            X
          </span>
        </div>
      )}
    </>
  );
};

export default Tags;
