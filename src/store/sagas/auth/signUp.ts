import { call, spawn, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import queryString from 'query-string';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsAuth from "store/actions/auth";
//import * as actionsTheme from "../../actions/theme";



interface BodyRequest {
    email: string;
    password: string;
}

const requestSignUp = (bodyRequest: BodyRequest) => {
    
    return axios.post(`${config.URL_BACK}/auth/sign-up`, bodyRequest, {withCredentials: true})
    
        .then(response => { 
        	//console.log(response)
        	return response;
        })
        .catch(error => {
            //console.log(error.response)
            return error.response;
        });
};


function* signUp(action: actionsAuth.type__SIGN_UP) {
    try {
            console.log(action)
        if (action.payload.email === "") {
            console.log('type email address');
            //addDeleteNotification("auth01", language);
        }
        else if ( !(/\S+@\S+\.\S+/).test(action.payload.email) ){
            console.log('type valid email address');
            //addDeleteNotification("auth021", language);
        }
        
        else if (action.payload.password1 === "" || action.payload.password2 === "") {
            console.log('type both passwords');
            //addDeleteNotification("auth03", language);
        }
        else if (action.payload.password1 !== action.payload.password2) {
            console.log('two passwords are different');
            //addDeleteNotification("auth04", language);
        }
        else if (action.payload.password1.length < 6) {
            console.log('password is too short');
            //addDeleteNotification("auth04", language);
        }
        
        else {
            
            const bodyRequest = {
                _id: uuidv4(),
                email: action.payload.email, 
                password: action.payload.password1
            };
            
           
            
            const res = yield call( requestSignUp, bodyRequest );
            console.log(res);
            
            const codeSituation = res.data.codeSituation;
            
            if (codeSituation === 'SignUp_Succeeded') {
                
                //Cookies.remove('logged');
                console.log(res.data.payload)
                // const user = res.data.payload;
                Cookies.set('logged_in', 'yes', { expires: 7, path: '/' });  
                
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
            
            }
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        console.log(error);
        console.log('sign up has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_SPECIAL({
            codeSituation: 'SignUp_UnknownError'
        }) );
    }
}

export default signUp;
