import logo from './logo.svg';
import React from 'react';
import Servicios from './components/Servicios';
import ReservaForm from './components/ReservaForm';
import CalendarioReservas from './components/CalendarioReservas';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Barbería</h1>
      <Servicios />
      <ReservaForm />
      <CalendarioReservas />
    </div>
  );
}

export default App;
