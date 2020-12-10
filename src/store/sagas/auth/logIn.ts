import { call, spawn, put, takeEvery, getContext } from "redux-saga/effects";
import axios from "axios";
import queryString from 'query-string';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsAuth from "store/actions/auth";
import * as actionsNotification from "store/actions/notification";



interface BodyRequest {
    email: string;
    password: string;
}

const requestLogIn = (bodyRequest: BodyRequest) => {
    

    alert(process.env.REACT_APP_URL_BACK);

    return axios.post(`${process.env.REACT_APP_URL_BACK}/auth/log-in`, bodyRequest, {withCredentials: true})
    .then(response => ({ response }))
    .catch(error => ({ error }))

};


function* logIn(action: actionsAuth.type__LOG_IN) {
    try {
        
        const history = yield getContext('history');

        yield put( actionsNotification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );


        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoEmail'
            }) );
            //addDeleteNotification("auth01", language);
        }
        
        else if (action.payload.password === "") {
            console.log('type password');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoPassword'
            }) );
            //addDeleteNotification("auth03", language);
        }
        
        
        else {
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'user'],
                replacement: false
            }) );
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['loading', 'user'],
                replacement: true
            }) );
                
            
            const bodyRequest = {
                email: action.payload.email, 
                password: action.payload.password
            };
        

            const {response, error}  = yield call( requestLogIn, bodyRequest );
            
            

            if (response && response.data.codeSituation === 'LogIn_Succeeded'){

                Cookies.set('logged_in', 'yes', { expires: 7, path: '/' });  
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                history.push('/');

            }
            else {
                const codeSituation = error.response.data.codeSituation;

                console.log(codeSituation);

                yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                    codeSituation: codeSituation
                }) );
                
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: false
                }) );
                
                Cookies.remove('logged_in')
            }
                
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        console.log(error);
        alert(error);
        console.log('log in has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogIn_UnknownError'
        }) );
        
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );
        // clear inputs
    }
}

export default logIn;
