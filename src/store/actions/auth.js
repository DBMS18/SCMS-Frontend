import * as actionTypes from './actionTypes';

export const authSuccess = (token, user, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
    localStorage.setItem('cart',[]);
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
    localStorage.setItem('cart',[]);
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
            const userId = localStorage.getItem('user');
            const role = localStorage.getItem('role');
            dispatch(authSuccess(token, userId,role));
            }   
        };
};

export const addItemToCart = (products) => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // localStorage.setItem('role', "guest");
    //localStorage.setItem('cart',JSON.stringify(products));
    return {
        type: actionTypes.ADD_ITEM,
        products: products
    };
};