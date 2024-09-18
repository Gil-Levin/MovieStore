import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-30vw',
    fontSize: '5vw',
    zIndex: '-1',
  };

  const spinnerStyle = {
    width: '40vw',
    height: '40vw',
  };

  return (
    <div style={containerStyle}>
      <Spinner animation="border" role="status" variant="warning" style={spinnerStyle} />
      <Spinner animation="border" role="status" variant="warning" style={spinnerStyle} />
    </div>
  );
}

export default Loading;
