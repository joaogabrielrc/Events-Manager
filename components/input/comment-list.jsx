import React from 'react';
import styles from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={styles.comments}>
      {props.items.map(item => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
