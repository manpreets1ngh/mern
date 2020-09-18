import {GET_EMPS, ADD_EMPS, EMPS_LOADING} from './types';
import { set } from 'mongoose';
import axios from 'axios';
import {tokenConfig} from './authActions';  
import {returnErrors} from './errorActions';

export const getEmps = () => dispatch => {
    dispatch(setEmpsLoading());
    axios.get('/api/emps')
    .then(res => dispatch({
        type:GET_EMPS,
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)));
}

export const addEmp = emp => (dispatch,getState) =>{
    axios.post('/api/emps',emp,tokenConfig(getState))
    .then(res => dispatch({
        type:ADD_EMPS,
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)));

}

export const setEmpsLoading = () =>{
    return{
        type:EMPS_LOADING
    }
}