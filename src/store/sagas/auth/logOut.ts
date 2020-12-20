import { call, spawn, put, takeEvery } from "redux-saga/effects";
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


function* logOut(action: actionsAuth.type__LOG_OUT) {

    firebaseAuth.signOut();

    yield put( actionsStatus.return__REPLACE({
        listKey: ['ready', 'user'],
        replacement: false
    }) );

}

export default logOut;
