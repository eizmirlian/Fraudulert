import React, { useState, useEffect } from 'react';
import transactionData from './flaggedTransactions.json'
import removeId from './FlaggedCharges.jsx'

function Chat({route, navigation}) {
  const [result, setResult] = useState('');
  const id = route.params['transId'];

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/gpt/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transaction: transactionData[id],
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
    navigation.popBackStack('Charges', {transId : id})
  };

  const handleNoClick = () => {
    // Handle "No" button click if needed
    console.log('User indicated they did not make the purchase');
    navigation.popBackStack('Charges', {transId : '-1'})
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