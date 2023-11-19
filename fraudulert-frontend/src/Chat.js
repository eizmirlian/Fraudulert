import React, { useState, useEffect } from 'react';

function Chat() {
  const [transaction, setTransaction] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:3001/api/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction,
          }),
        });

        const responseData = await response.json();

        setResult(responseData.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleYesClick = () => {
    // Handle "Yes" button click if needed
    console.log('User indicated they made the purchase');
  };

  const handleNoClick = () => {
    // Handle "No" button click if needed
    console.log('User indicated they did not make the purchase');
  };

  return (
    <div>
      <p>Did you make this purchase?</p>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>
      <div>
        {result}
      </div>
    </div>
  );
}

export default Chat;