import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { firebaseAuth } from 'firebaseApp';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsAuth from "store/actions/auth";
import * as actionsNotification from "store/actions/notification";




function* logCheckSucceeded(action: actionsAuth.type__LOG_CHECK_SUCCEEDED) {
    
    yield put( actionsStatus.return__REPLACE({
        listKey: ['ready', 'user'],
        replacement: true
    }) );
    
    yield put( actionsStatus.return__REPLACE({
        listKey: ['loading', 'user'],
        replacement: false
    }) );
        
    console.log(firebaseAuth.currentUser);

    // go to home
        
}

export default logCheckSucceeded;
