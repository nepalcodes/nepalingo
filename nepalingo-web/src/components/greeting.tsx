import React from 'react';
import Button from "./Button";
import useDictionary from "../hooks/useDictionary";

const Flashcard = () => ("");
message: ;
const words = [
    'Good Morning',
    'Good Evening',
    'Good Afternoon',
]

export type GreetingCardProps = {
    language: {},
    word: string
}

export type GreetingCardResponse = {
    language: string;
    word: string;


}
const GreetingCard: React.FC<GreetingCardProps> = ({ }) => {
    return (
        <div style={{ border: '1px solid #000', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <h1>{ }</h1>
        </div>
    );
};

export default GreetingCard;
