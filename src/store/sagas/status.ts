import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
//import axios from "axios";
//import * as config from '../../config';

import * as actionsStatus from "../actions/status";
import detectLanguage from './status/detectLanguage';
import readOptionTheme from './status/readOptionTheme';
import decideTheme from './status/decideTheme';



export default function* sagaStatus() {
    
    yield takeEvery( actionsStatus.name__DETECT_LANGUAGE, detectLanguage );
    
    yield takeEvery( actionsStatus.name__READ_OPTION_THEME, readOptionTheme );
    
    yield takeEvery( actionsStatus.name__DECIDE_THEME, decideTheme );
    
}