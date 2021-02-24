import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth';

class Signout extends Component {
    componentDidMount () {
        this.props.onLogout();
    }

    render () {
        return (<Redirect to="/signin"/>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Signout);