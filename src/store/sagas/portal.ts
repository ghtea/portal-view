import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';
import getListPortal from 'store/sagas/portal/getListPortal';
import createPortal from 'store/sagas/portal/createPortal';
import editPortal from 'store/sagas/portal/editPortal';
import visitPortal from 'store/sagas/portal/visitPortal';

import * as actionsPortal from "../actions/portal";


export default function* sagaPortal() {
    yield takeLatest( actionsPortal.name__GET_LIST_PORTAL, getListPortal ); 
    
    yield takeEvery( actionsPortal.name__CREATE_PORTAL, createPortal ); 
    yield takeEvery( actionsPortal.name__EDIT_PORTAL, editPortal ); 

    yield takeEvery( actionsPortal.name__VISIT_PORTAL, visitPortal ); 
}

