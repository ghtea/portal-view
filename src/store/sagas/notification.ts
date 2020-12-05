import { call, spawn, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';

import addDeleteBanner from 'store/sagas/notification/addDeleteBanner';
import deleteBanner from 'store/sagas/notification/deleteBanner';
import addCodeSituationSpecial from 'store/sagas/notification/addCodeSituationSpecial';
import deleteCodeSituationSpecial from 'store/sagas/notification/deleteCodeSituationSpecial';

import * as actionsNotification from "../actions/notification";


export default function* sagaNotification() {
    yield takeEvery( actionsNotification.name__ADD_DELETE_BANNER, addDeleteBanner ); 
    yield takeEvery( actionsNotification.name__DELETE_BANNER, deleteBanner ); 
    yield takeEvery( actionsNotification.name__ADD_CODE_SITUATION_SPECIAL, addCodeSituationSpecial ); 
    yield takeEvery( actionsNotification.name__DELETE_CODE_SITUATION_SPECIAL, deleteCodeSituationSpecial ); 
}