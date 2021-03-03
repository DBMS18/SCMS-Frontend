import React from 'react';
import { Redirect } from 'react-router-dom';


function Home(props) {
    console.log(localStorage.getItem('role'))
    if (localStorage.getItem('role')==="manager") {
      return(
          <Redirect to='/manager'/>
      );
    }else if (localStorage.getItem('role')==="store_keeper") {
        return(
            <Redirect to='/storekeeper'/>
        );
    }else if (localStorage.getItem('role')==="driver_assistant") {
        return(
            <Redirect to='/driverassistant'/>
        );
    }else if (localStorage.getItem('role')==="admin") {
      return(
          <Redirect to='/admin'/>
      );
  }
    return(
      <div className="container">
        <h4>Home</h4>
      </div>
    );
}

export default Home; 