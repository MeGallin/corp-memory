import './Tags.scss';

const Tags = ({ tag, urgency }) => {
  return <div className={`tags-wrapper ${urgency}`}>{tag}</div>;
};

export default Tags;
