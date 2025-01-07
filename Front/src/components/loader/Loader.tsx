import React from 'react';
import styles from './Loader.module.css';  // Importamos las clases CSS del módulo

interface LoaderProps {
  title: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContainer}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.animation}>
          <div className={`${styles.box} ${styles['box-1']}`}>
            <div className={styles['side-left']} />
            <div className={styles['side-right']} />
            <div className={styles['side-top']} />
          </div>
          <div className={`${styles.box} ${styles['box-2']}`}>
            <div className={styles['side-left']} />
            <div className={styles['side-right']} />
            <div className={styles['side-top']} />
          </div>
          <div className={`${styles.box} ${styles['box-3']}`}>
            <div className={styles['side-left']} />
            <div className={styles['side-right']} />
            <div className={styles['side-top']} />
          </div>
          <div className={`${styles.box} ${styles['box-4']}`}>
            <div className={styles['side-left']} />
            <div className={styles['side-right']} />
            <div className={styles['side-top']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
