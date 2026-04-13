import React from "react";
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <div>Error 404</div>
      <div className={styles.description}>Not Found</div>
    </div>
  );
};

export default NotFoundBlock;
