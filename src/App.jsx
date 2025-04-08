import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TelaVendedor from './vendedor';
import TelaSupervisor from './supervisor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    
  <BrowserRouter>
    <Routes>
      <Route path="/vendedor" element={<TelaVendedor/>}/>
      <Route path="/supervisor" element={<TelaSupervisor/>}/>
    </Routes>
  
  
  </BrowserRouter>    
  );
}

export default App;