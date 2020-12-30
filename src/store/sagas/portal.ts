import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';
import getListPortal from 'store/sagas/portal/getListPortal';
import sortListPortal from 'store/sagas/portal/sortListPortal';
import checkAllPortals from 'store/sagas/portal/checkAllPortals';

import manipulatePortal from 'store/sagas/portal/manipulatePortal';
import deletePortal from 'store/sagas/portal/deletePortal';

import visitPortal from 'store/sagas/portal/visitPortal';

import * as actionsPortal from "../actions/portal";


export default function* sagaPortal() {

    yield takeLatest( actionsPortal.name__GET_LIST_PORTAL, getListPortal );   // this alone does not make listPortal ready yet
    yield takeLatest( actionsPortal.name__CHECK_ALL_PORTALS, checkAllPortals );  // this alone does not make listPortal ready yet
    
    yield takeLatest( actionsPortal.name__SORT_LIST_PORTAL, sortListPortal );   // listPortal become ready!!!

    yield takeEvery( actionsPortal.name__MANIPULATE_PORTAL, manipulatePortal ); 
    yield takeEvery( actionsPortal.name__DELETE_PORTAL, deletePortal ); 

    yield takeEvery( actionsPortal.name__VISIT_PORTAL, visitPortal ); 
}

