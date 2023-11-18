import React, { useState } from 'react';
import Welcome from './Welcome';

const App = ( {navigation} ) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleProceed = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        navigation.push('Charges')
      ) : (
        <Welcome onProceed={handleProceed} />
      )}
    </div>
  );
};

export default App;