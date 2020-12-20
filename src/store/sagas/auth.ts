import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';

import signUp from 'store/sagas/auth/signUp';
import logIn from 'store/sagas/auth/logIn-bu';
import logOut from 'store/sagas/auth/logOut';
import logCheckSucceeded from 'store/sagas/auth/logCheckSucceeded';
import logCheckFailed from 'store/sagas/auth/logCheckFailed';


import * as actionsAuth from "../actions/auth";


export default function* sagaAuth() {
    yield takeLatest( actionsAuth.name__LOG_CHECK_SUCCEEDED, logCheckSucceeded ); 
    yield takeLatest( actionsAuth.name__LOG_CHECK_FAILED, logCheckFailed ); 

    yield takeLatest( actionsAuth.name__LOG_IN, logIn ); 
    yield takeLatest( actionsAuth.name__LOG_OUT, logOut ); 

    yield takeLatest( actionsAuth.name__SIGN_UP, signUp ); 
    
}

