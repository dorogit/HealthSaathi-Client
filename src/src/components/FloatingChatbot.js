import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const FloatingChatbot = ({ onButtonClick }) => {
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFloating(prevState => !prevState);
    }, 800); // Adjust the duration as needed (in milliseconds)

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  // CSS styles for floating animation
  const floatingStyles = {
    position: 'fixed',
    bottom: isFloating ? 20 : 30,
    right: 20,
    zIndex: 1000,
    transition: 'bottom 1s ease-in-out', // Smooth transition for bottom position
  };

  return (
    <div style={floatingStyles}>
      <Button style={{ borderRadius: 10 }} size='massive' color='blue' onClick={onButtonClick}>
        <Icon name='medkit' />
        AI Medical Assistant
      </Button>
    </div>
  );
};

export default FloatingChatbot;
