import { call, spawn, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import queryString from 'query-string';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsAuth from "store/actions/auth";
import * as actionsNotification from "store/actions/notification";



interface BodyRequest {
    email: string;
    password: string;
}

const requestLogIn = (bodyRequest: BodyRequest) => {
    
    return axios.post(`${config.URL_BACK}/auth/log-in`, bodyRequest, {withCredentials: true})
    
        .then(response => { 
        	//console.log(response)
        	return response;
        })
        .catch(error => {
            //console.log(error.response)
            return error.response;
        });
};


function* logIn(action: actionsAuth.type__LOG_IN) {
    try {
        
        if (action.payload.email === "") {
            console.log('type email address');
            //addDeleteNotification("auth01", language);
        }
        else if ( !(/\S+@\S+\.\S+/).test(action.payload.email) ){
            console.log('type valid email address');
            //addDeleteNotification("auth021", language);
        }
        
        else if (action.payload.password === "") {
            console.log('type password');
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
        
    
            const res = yield call( requestLogIn, bodyRequest );
            console.log(res);
            
            const codeSituation = res.data.codeSituation;
            
            if (codeSituation === 'LogIn_Succeeded') {
                
                //Cookies.remove('logged');
                console.log(res.data.payload)
                // const user = res.data.payload;
                Cookies.set('logged_in', 'yes', { expires: 7, path: '/' });  
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );
            
            }
            else {
                
                console.log(codeSituation);
                
                // SignUp_UnknownError, SignUp_DuplicateEmail
                yield put( actionsNotification.return__ADD_CODE_SITUATION_SPECIAL({
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
        console.log('log in has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_SPECIAL({
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
