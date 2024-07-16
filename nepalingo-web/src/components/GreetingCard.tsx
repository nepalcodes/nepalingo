import React from 'react';

interface GreetingCardProps {
  message: string;
}

const cardStyle: React.CSSProperties = {
  border: '2px solid #000',
  borderRadius: '15px',
  padding: '20px',
  margin: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  fontFamily: 'Arial, sans-serif',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#333',
};

const GreetingCard: React.FC<GreetingCardProps> = ({ message }) => {
  return (
    <div style={cardStyle}>
      <h1 style={headingStyle}>{message}</h1>
    </div>
  );
};

export default GreetingCard;
