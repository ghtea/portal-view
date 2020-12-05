import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
//import axios from "axios";
//import * as config from '../../config';

import * as actionsStatus from "../actions/status";
import changeLanguage from './status/changeLanguage';
import readOptionTheme from './status/readOptionTheme';
import decideTheme from './status/decideTheme';
import readLanguage from './status/readLanguage';



export default function* sagaStatus() {
    
    yield takeEvery( actionsStatus.name__CHANGE_LANGUAGE, changeLanguage );
    
    yield takeEvery( actionsStatus.name__READ_OPTION_THEME, readOptionTheme );
    
    yield takeEvery( actionsStatus.name__DECIDE_THEME, decideTheme );
    
    yield takeLatest( actionsStatus.name__READ_LANGUAGE, readLanguage );
}