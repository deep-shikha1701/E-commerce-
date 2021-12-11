import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Layout from './Components/Layouts/index'
import Home from './Container/Home';
import Signin from './Container/Signin';
import Signup from './Container/Signup';
import PrivateRoute from './Components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/index';
import Products from './Container/Products';
import Orders from './Container/Orders';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn()); 
    }
  }, [])


  return (
    <div className="App">
      {/* <Router> */}
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path='/products' component={Products  }/>
        <PrivateRoute path='/orders' component={Orders}/>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
