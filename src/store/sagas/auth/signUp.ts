import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

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
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: true
        }) );

        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );


        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NoEmail__E'
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
                codeSituation: 'SignUp_NoPassword__E'
            }) );
            //addDeleteNotification("auth03", language);
        }
        else if (action.payload.password1 !== action.payload.password2) {
            console.log('two passwords are different');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_PasswordsDifferent__E'
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
                const user = yield call( requestSignUp, email, password );
                console.log(user);

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'SignUp_Succeeded__S'
                }) );

                yield put( actionsAuth.return__REPLACE({
                    listKey: ['user'],
                    replacement: {
                        id: user.uid,
                        email: user.email,

                        joined: user.metadata.creationTime,
                        accessed: user.metadata.lastSignInTime
                    }
                }) );
                
                history.push('/');
            } 
            catch (error){

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: false
                }) );

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                console.log(error);
                if (error.code === 'auth/email-already-in-use'){
                    console.log(error.message);
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_DuplicateEmail__E'
                    }) );
                }
                else if (error.code === 'auth/invalid-email'){
                    console.log(error.message);
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_InvalidEmail__E'
                    }) );
                }
                else if (error.code === 'auth/weak-password'){
                    console.log(error.message);
                    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_WeakPassword__E'
                    }) );
                }
                else if (error.code === 'auth/operation-not-allowed'){
                    console.log(error.message);
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'SignUp_UnknownError__E'
                    }) );
                }
                else {
                    console.log(error);
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'SignUp_UnknownError__E'
                    }) );
                }
                
                
            }
            
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {

        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );

        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: false
        }) );

        console.log(error);
        console.log('signUp has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'SignUp_UnknownError'
        }) );
    }
}

export default signUp;
