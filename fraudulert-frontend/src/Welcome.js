import React, { useState } from 'react';

const Welcome = ({ navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data/' + username + '/' + password);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigation.push('Charges');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProceed = () => {
    // Check if the username and password match
    fetchData();
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Fraudulert</h1>
      <label style={styles.inputheader}>
        Username:
      </label>
      <label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.inputheader}>
        Password:
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputbottom}
        />
      </label>
      <br />
      <button onClick={handleProceed} style={styles.button}>Proceed</button>
    </div>
  );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100vw', 
        backgroundColor: '#333', 
        color: '#fff', 
        padding: '20px',
        borderRadius: '8px',
        backgroundImage: 'url("/backgroundimg.jpeg")', 
        backgroundSize: 'cover', 
    },
    title: {
      fontSize: `${100}px`, 
      padding: `${50}px`, 
      marginBottom: '100px',
      color: '#3C4142',
    },   
    input: {
      width: '100%',
      padding: `${20}px`, 
      margin: `${8}px 0`,
      boxSizing: 'border-box',
      fontSize: `${40}px`,
      color: '#000',
    },
    inputbottom: {
      width: '100%',
      padding: `${20}px`, 
      margin: `${8}px 0`,
      boxSizing: 'border-box',
      fontSize: `${40}px`,
      marginBottom: `${50}px`, 
      color: '#000',
    },
    inputheader: {
      fontSize: `${30}px`, 
      marginBottom: `${5}px`, 
      color: '#000',
    },
    button: {
      backgroundColor: '#61dafb', 
      padding: `${25}px ${50}px`, 
      fontSize: `${30}px`, 
      borderRadius: `${10}px`, 
      cursor: 'pointer',
      marginBottom: `${80}px`,
      color: '#000',
    },
  };

export default Welcome;