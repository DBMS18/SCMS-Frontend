import React, { Component } from 'react';
import Header from '../components/Header/Header';
//import Footer from '../components/Footer';
import Home from './Home';
import Store from './Store';
import Contact from './Contact';
import { Switch, Route, Redirect } from 'react-router-dom';

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
              <Route exact path='/store' component={() => <Store />} />
              <Route exact path='/contact' component={() => <Contact />} />
              <Redirect to="/home" />
          </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Main;
