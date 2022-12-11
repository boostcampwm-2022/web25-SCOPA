import { useParams } from 'react-router-dom';

export const MessageDetail = () => {
  const { id = null } = useParams();

  return (
    <div>
      <img src='/earlybird.gif' alt='earlybird' />
      <span>{id}</span>
    </div>
  );
};
