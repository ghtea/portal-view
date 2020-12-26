import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';
import getListPortal from 'store/sagas/portal/getListPortal';
import manipulatePortal from 'store/sagas/portal/manipulatePortal';
import deletePortal from 'store/sagas/portal/deletePortal';

import visitPortal from 'store/sagas/portal/visitPortal';

import * as actionsPortal from "../actions/portal";


export default function* sagaPortal() {
    yield takeLatest( actionsPortal.name__GET_LIST_PORTAL, getListPortal ); 
    
    yield takeEvery( actionsPortal.name__MANIPULATE_PORTAL, manipulatePortal ); 
    yield takeEvery( actionsPortal.name__DELETE_PORTAL, deletePortal ); 

    yield takeEvery( actionsPortal.name__VISIT_PORTAL, visitPortal ); 
}

