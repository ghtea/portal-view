import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';

import createPortal from 'store/sagas/portal/createPortal';
import getListPortal from 'store/sagas/portal/getListPortal';
import visitPortal from 'store/sagas/portal/visitPortal';

import * as actionsPortal from "../actions/portal";


export default function* sagaPortal() {
    yield takeEvery( actionsPortal.name__CREATE_PORTAL, createPortal ); 
    yield takeLatest( actionsPortal.name__GET_LIST_PORTAL, getListPortal ); 
    yield takeEvery( actionsPortal.name__VISIT_PORTAL, visitPortal ); 
}

