import { call, spawn, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import queryString from 'query-string';
import { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsAuth from "store/actions/auth";
//import * as actionsTheme from "../../actions/theme";



const requestLogIn = (email:string, password:string) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password)  
};


function* logIn(action: actionsAuth.type__LOG_IN) {
    try {

        yield put( actionsNotification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoEmail'
            }) );
        }
        else if (action.payload.password === "") {
            console.log('type password');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoPassword'
            }) );
        }
        else {
            
            const email:string = action.payload.email; 
            const password:string = action.payload.password;
            
            try {
                const res = yield call( requestLogIn, email, password );
                console.log(res);

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );
            } 
            catch (error){
                console.log(error);
                if (error.code === 'auth/wrong-password'){
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'LogIn_DuplicateEmail'
                    }) );
                }
                else if (error.code === 'auth/invalid-email'){
                    console.log(error.message);
                }
                else if (error.code === 'auth/user-disabled'){
                    console.log(error.message);
                }
                else if (error.code === 'auth/user-not-found'){
                    console.log(error.message);
                }
                else {
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'LogIn_UnknownError'
                    }) );
                }
                
                
            }
            
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        console.log(error);
        console.log('sign up has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogIn_UnknownError'
        }) );
    }
}

export default logIn;
