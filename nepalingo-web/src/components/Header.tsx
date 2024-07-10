import React from 'react';
import styles from './header.module.css';
const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      </header>
    </div>
  );
};

export default Header;
