import React from 'react';
import styles from '../assets/styles//components/header.module.css';

const HelloWorld: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      </header>
    </div>
  );
};

export default HelloWorld;
