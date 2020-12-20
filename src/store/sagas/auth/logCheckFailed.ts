import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { firebaseAuth } from 'firebaseApp';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsAuth from "store/actions/auth";
import * as actionsNotification from "store/actions/notification";




function* logCheckFailed(action: actionsAuth.type__LOG_CHECK_FAILED) {
    
    yield put( actionsStatus.return__REPLACE({
        listKey: ['ready', 'user'],
        replacement: false
    }) );
    
    yield put( actionsStatus.return__REPLACE({
        listKey: ['loading', 'user'],
        replacement: false
    }) );
    
    yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
        codeSituation: 'LogCheck_UnknownError__E'
    }) );
    console.log('log check failed');
}

export default logCheckFailed;
