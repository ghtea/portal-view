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



const requestSignUp = (email:string, password:string) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password)  
};


function* signUp(action: actionsAuth.type__SIGN_UP) {
    try {

        yield put( actionsNotification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        

        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NoEmail'
            }) );
            //addDeleteNotification("auth01", language);
        }
        /*
        else if ( !(/\S+@\S+\.\S+/).test(action.payload.email) ){
            console.log('type valid email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NotValidEmail'
            }) );
            //addDeleteNotification("auth021", language);
        }
        */
        else if (action.payload.password1 === "" || action.payload.password2 === "") {
            console.log('type both passwords');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NoPassword'
            }) );
            //addDeleteNotification("auth03", language);
        }
        else if (action.payload.password1 !== action.payload.password2) {
            console.log('two passwords are different');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_PasswordsDifferent'
            }) );
            //addDeleteNotification("auth04", language);
        }
        /*
        else if (action.payload.password1.length < 6) {
            console.log('password is too short');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_ShortPassword'
            }) );
            //addDeleteNotification("auth04", language);
        }
        */
        else {
            
            const email:string = action.payload.email; 
            const password:string = action.payload.password1;
            
            try {
                const res = yield call( requestSignUp, email, password );
                console.log(res);

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );
            } 
            catch (error){
                console.log(error);
                if (error.code === 'auth/email-already-in-use'){
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_DuplicateEmail'
                    }) );
                }
                else if (error.code === 'auth/invalid-email'){
                    console.log(error.message);
                }
                else if (error.code === 'auth/weak-password'){
                    console.log(error.message);
                }
                else if (error.code === 'auth/operation-not-allowed'){
                    console.log(error.message);
                }
                else {
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_UnknownError'
                    }) );
                }
                
                
            }
            
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        console.log(error);
        console.log('sign up has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'SignUp_UnknownError'
        }) );
    }
}

export default signUp;
