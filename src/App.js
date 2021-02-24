import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './pages/Main';
import customTheme from './utils/theme';

import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';



class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
          <ChakraProvider theme={customTheme}>
            <div className="App">
              <Main />
            </div>
          </ChakraProvider>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );
