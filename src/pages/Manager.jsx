import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Manager extends Component {
    state = {  }
    render() {
        if (localStorage.getItem('role')==="customer") {
            return(
                <Redirect to='/home'/>
            );
        }else if (localStorage.getItem('role')==="store_keeper") {
            return(
                <Redirect to='/storekeeper'/>
            );
        }else if (localStorage.getItem('role')==="driver_assistant") {
            return(
                <Redirect to='/driverassistant'/>
            );
        }
        return (
            <div>
                Manager
            </div>
        );
    }
}

export default Manager;