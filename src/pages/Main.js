import React, { Component } from 'react';
import Header from '../components/Header/Header';
//import Footer from '../components/Footer';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import Store from './Store';
import Contact from './Contact';
import Signout from './Signout';
import Manager from './Manager';
import Cart from './Cart';
import StoreKeeper from './StoreKeeper';
import DriverAssistant from './DriverAssistant';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

class Main extends Component {
  render(){
    const HomePage = () => {
      return(
          <Home />
      );
    }

    return (
      <div>
        <Header />
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/store' component={() => <Store page={"store"} />} />
              <Route exact path='/contact' component={() => <Contact />} />
              <Route exact path='/cart' component={() => <Cart page={"cart"} />} />
              <Route exact path='/signup' component={() => <Signup />} />
              <Route exact path='/signin' component={() => <Signin />} />
              <Route exact path='/signout' component={() => <Signout />} />
              <Route exact path='/manager' component={() => <Manager />} />
              <Route exact path='/storekeeper' component={() => <StoreKeeper />} />
              <Route exact path='/driverassistant' component={() => <DriverAssistant />} />
              <Redirect to="/home" />
          </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(Main);
