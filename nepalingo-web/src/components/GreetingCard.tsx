import React from 'react';
import ReactGA from 'react-ga4';

interface GreetingCardProps {

  name: string;
}

const cardStyle: React.CSSProperties = {
  border: '2px solid #000',
  borderRadius: '15px',
  padding: '20px',
  margin: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  fontFamily: 'Arial, sans-serif',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2em',
  color: '#333',
};

const GreetingCard: React.FC<GreetingCardProps> = ({ name }) => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "home" });

  const getCurrentGreeting = (): string => {
    const CurrentHours = new Date().getHours();
    if (CurrentHours < 12) {
      return 'Good Morning';
    }
    else if (CurrentHours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
  return (
    <div style={cardStyle}>
      <h1 style={headingStyle}>{`${getCurrentGreeting()}, ${name}`} </h1>

    </div>
  );
};

export default GreetingCard;
