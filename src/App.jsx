import React, { useState } from 'react';
import Login from './Login.jsx';
import TelaSupervisor from './TelaSupervisor';
import TelaVendedor from './TelaVendedor';

const App = () => {
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
  };

  return (
    <div>
      {!userType ? (
        <Login onLogin={handleLogin} />
      ) : userType === 'supervisor' ? (
        <TelaSupervisor />
      ) : (
        <TelaVendedor />
      )}
    </div>
  );
};

export default App;
