import React from 'react'

const FlaggedCharge = (props) => (
  <button onClick={props.onClick} role={props.role} style={style.button}>
    {props.children}
  </button>
)

const style = {
  button: {
    backgroundColor: '#61dafb', 
    padding: `${25}px ${50}px`, 
    fontSize: `${15}px`, 
    borderRadius: `${10}px`, 
    cursor: 'pointer',
    marginBottom: `${30}px`,
    color: '#000',
  },
};

export { FlaggedCharge }