import './Tags.scss';

const Tags = ({ id, tag, urgency }) => {
  const handleDeleteTag = (id) => {
    console.log('Delete', id);
    //Dispatch Action here
  };
  return (
    <div className={`tags-wrapper ${urgency}`}>
      {tag}
      <span className="tag-x" onClick={() => handleDeleteTag(id)}>
        X
      </span>
    </div>
  );
};

export default Tags;
