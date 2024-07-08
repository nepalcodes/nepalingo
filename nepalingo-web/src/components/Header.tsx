import React from 'react';
import styles from './header.module.css';
import Card from './card/Card'
const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      </header>
      <Card 
        Word="Example"
        TranslatedWord="उदाहरण"
        Pronunciation="udāharaṇa"
        DevenagiriSpelling="उदाहरण"
        ImageUrl="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"  // Replace with your image URL
        PronounciationUrl="https://example.com/sound.mp3"  // Replace with your sound URL
      />
    </div>
  );
};

export default Header;
