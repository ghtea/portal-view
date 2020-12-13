import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';

import createPortal from 'store/sagas/portal/createPortal';

import * as actionsPortal from "../actions/portal";


export default function* sagaPortal() {
    yield takeEvery( actionsPortal.name__CREATE_PORTAL, createPortal ); 
}

