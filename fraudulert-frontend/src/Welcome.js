import React, { useState } from 'react';

const Welcome = ({ onProceed }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleProceed = () => {
    // Check if the username and password match (you can add your validation logic here)
    if (username === 'nate' && password === '1234') {
      onProceed();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default Welcome;