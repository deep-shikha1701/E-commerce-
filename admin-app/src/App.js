import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import Layout from './Components/Layouts/index'
import Home from './Container/Home';
import Signin from './Container/Signin';
import Signup from './Container/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
