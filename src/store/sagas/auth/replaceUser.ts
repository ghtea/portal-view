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



function* replaceUser(action: actionsAuth.type__REPLACE_USER) {
    try {

        const user = action.payload?.user || firebaseAuth.currentUser;

        yield put( actionsAuth.return__REPLACE({
            listKey: ['user'],
            replacement: {
                id: user.uid,
                email: user.email,
                
                photoURL: user.photoURL,
                displayName: user.displayName,
    
                joined: user.metadata.creationTime,
                accessed: user.metadata.lastSignInTime
            }
        }) );
        
    } catch (error) {
        console.log(error);
        console.log('replaceUser has been failed');
        
        yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'UnknownError__E'
        }) );
    }
}

export default replaceUser;
