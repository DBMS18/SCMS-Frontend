import React from 'react';
import { Redirect } from 'react-router-dom';


function Home(props) {
    console.log(localStorage.getItem('role'))
    if (localStorage.getItem('role')==="store_keeper") {
      return(
        <Redirect to='/storekeeper' />
      )
    }
    return(
      <div className="container">
        <h4>Home</h4>
      </div>
    );
}

export default Home; 