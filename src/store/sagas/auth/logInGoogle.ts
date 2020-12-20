import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import axios from "axios";
import queryString from 'query-string';
import firebaseApp, { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsAuth from "store/actions/auth";
//import * as actionsTheme from "../../actions/theme";




const requestLogInGoogle = (provider:any) => {
    return firebaseAuth.signInWithPopup(provider)
};


function* logInGoogle(action: actionsAuth.type__LOG_IN_GOOGLE) {
    try {

        const provider = new firebaseApp.auth.GoogleAuthProvider();
            //provider = new firebaseApp.auth.GithubAuthProvider();
        

        yield put( actionsNotification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
            
            try {
                const data = yield call( requestLogInGoogle, provider );
                console.log(data.user);

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                yield put( actionsAuth.return__REPLACE({
                    listKey: ['user'],
                    replacement: {
                        id: data.user.uid,
                        email: data.user.email,

                        joined: data.user.metadata.creationTime,
                        accessed: data.user.metadata.lastSignInTime
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

                yield put( actionsAuth.return__REPLACE({
                    listKey: ['user'],
                    replacement: {}
                }) );


                console.log(error);
                if (error.code === 'auth/account-exists-with-different-credential'){
                    console.log(error.message);
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGoogle_UnknownError__E'
                    }) );
                }
                else {
                    console.log(error);
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGoogle_UnknownError__E'
                    }) );
                }
                
                
            }
                

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
        console.log('logInGoogle has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogInGoogle_UnknownError__E'
        }) );
    }
}

export default logInGoogle;
