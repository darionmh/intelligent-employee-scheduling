import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Employees from './pages/Employees';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Route name="home" path="/" exact component={null}/>
      <Route name="employees" path="/employees" component={Employees} />
      {/* <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} /> */}
      {/* <Route component={NoMatch} /> */}
    </Router>
  );
}

export default App;
