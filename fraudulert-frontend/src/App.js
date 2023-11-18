import React, { useState } from 'react';
import Welcome from './Welcome';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleProceed = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <h1>Successfully Logged In!</h1>
      ) : (
        <Welcome onProceed={handleProceed} />
      )}
    </div>
  );
};

export default App;