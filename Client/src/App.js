import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
