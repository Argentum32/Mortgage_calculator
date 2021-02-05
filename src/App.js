import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";

import './App.css';
import HomePage from './HomePage';
import Loan from './Loan';


function App() {

  return (
    <Router>
      <div className='header'>
        <NavLink className='header-btn' to='/'>Home</NavLink>
      </div>
      <Switch>
          <Route path="/loan/:id">
            <Loan />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;