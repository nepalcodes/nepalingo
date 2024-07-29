import React from 'react';
import Quiz from './QuizComponent';

const ParentComponent = () => {
    const handleExit = () => {
        // Logic to handle exit
        console.log('Quiz exited');
    };

    return (
        <div>
            <h1>Welcome to the Quiz</h1>
            <Quiz onExit={handleExit} />
        </div>
    );
};

export default ParentComponent;
