import React from 'react';
import CustomerPortal from './components/CustomerPortal';
import Emp from './components/Emp';

import Login from './components/Employee/Login';

const App: React.FC = () => {
  return (
    <div>
      <CustomerPortal />
      <Emp />
      <Login/>
    </div>
  );
};

export default App;
