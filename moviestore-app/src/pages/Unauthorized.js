import React from 'react';
import '../css/Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>401 - Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
    </div>
  );
};

export default Unauthorized;
