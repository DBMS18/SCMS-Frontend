

import * as actionTypes from './actionTypes';

export const authSuccess = (token, user, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user,
        role: role
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('role', "guest");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const role = localStorage.getItem('role');
            dispatch(authSuccess(token, userId, role));
            }   
        };
};