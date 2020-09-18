import {
    USER_LOADING,
    USER_LOADED,
    USER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import axios from 'axios';
import {returnErrors} from './errorActions';
import { Component } from 'react';
import { Redirect } from 'react-router';

// Check token and load the user
export const loadUser = () =>(dispatch,getState)=>{
    // User Loading
    dispatch({
        type:USER_LOADING
    });

    // Fetch the User
    axios.get('/api/auth/user',tokenConfig(getState))
    .then(res => dispatch({
        type:USER_LOADED,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data,err.response.status));
        dispatch({
            type:USER_ERROR
        });
    });
}

// Register User
export const register = ({
    fullname,
    username,
    email,
    password
}) => dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({fullname,username,email,password});
    axios.post('/api/users',body,config)
    .then(res => dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({
            type:REGISTER_FAIL,
        });
    });
}

// Login User
export const login = ({email,password}) =>dispatch=>{
    // Headers
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({email,password});
    axios.post('/api/auth',body,config)
    .then(res => dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data,
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        });
    });
}

// Logout User
export const logout = ()=>{
    return{
        type:LOGOUT_SUCCESS
    }
}

// Setup config/header and token
export const tokenConfig=getState=>{
    // get token from local storage
    const token=getState().auth.token;

    // Headers
    const config={
        headers:{
            "Content-type":"application/json"
        }
    }
    // if token, add to headers
    if(token){
        config.headers['x-auth-token']=token;
    }
    return config;
}

