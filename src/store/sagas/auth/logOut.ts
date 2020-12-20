import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';

// import * as config from 'config';

import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsAuth from "store/actions/auth";
//import * as actionsTheme from "../../actions/theme";


function* logOut(action: actionsAuth.type__LOG_OUT) {

    firebaseAuth.signOut();

    yield put( actionsStatus.return__REPLACE({
        listKey: ['ready', 'user'],
        replacement: false
    }) );

    // history.push('/');

    window.location.reload(false);
    //window.location.href = window.location.href;

}

export default logOut;
