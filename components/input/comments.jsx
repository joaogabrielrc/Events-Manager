import React, { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {    
    fetch(`/api/v1/events/${eventId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [showComments]);

  const toggleCommentsHandler = async () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const addCommentHandler = commentData => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    };

    fetch(`/api/v1/events/${eventId}/comments`, requestOptions)
      .then(response => response.json())
      .then(data => {});
  };

  return (
    <section className={styles.comments}>
      <button className={styles.btn} onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && (
        <NewComment onAddComment={addCommentHandler} />
      )}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
