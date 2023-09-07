import React from 'react';
import {  useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/home');
  };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1>404 - Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <button onClick={handleBackToHome} id="backToHomeButton" className='bg-gray-200 border border-black'>
            Back to Home
          </button>
        </div>
      );
    };

export default NotFound;