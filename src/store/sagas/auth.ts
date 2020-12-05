import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';

import signUp from 'store/sagas/auth/signUp';
import logIn from 'store/sagas/auth/logIn';
import logCheck from 'store/sagas/auth/logCheck';


import * as actionsAuth from "../actions/auth";


export default function* sagaAuth() {
    yield takeLatest( actionsAuth.name__LOG_IN, logIn ); 
    yield takeLatest( actionsAuth.name__SIGN_UP, signUp ); 
    yield takeLatest( actionsAuth.name__LOG_CHECK, logCheck ); 
    //yield takeEvery( actionsAuth.name__SIGN_UP, signUp ); 
}

