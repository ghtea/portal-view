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

const requestLogCheck = () => {
    
    return axios.get(`${config.URL_BACK}/auth/log-check`, {withCredentials: true})
    
        .then(response => { 
        	//console.log(response)
        	return response;
        })
        .catch(error => {
            //console.log(error.response)
            return error.response;
        });
    
};


function* logCheck(action: actionsAuth.type__LOG_CHECK) {
    try {
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: true
        }) );
        
        const loggedIn = Cookies.get('logged_in') 
        
        if(!loggedIn) {
            
            console.log("no logged in user");
            
            //replaceDataAuth("user", {});
            yield put( actionsAuth.return__REPLACE({
                listKey: ['loading', 'user'],
                replacement: false
            }) );
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'user'],
                replacement: false
            }) );
            
            
            return; // 로그인 정보가 없다면 여기서 멈춥니다.
        } 
        
        else {
        
    
            const res = yield call( requestLogCheck );
            
            console.log(res);
            
            const codeSituation = res.data.codeSituation;
            
            if (codeSituation === 'LogCheck_Succeeded') {
                
                //Cookies.remove('logged');
                console.log(res.data.payload)
                
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
        console.log('log check has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_SPECIAL({
            codeSituation: 'LogCheck_UnknownError'
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

export default logCheck;
