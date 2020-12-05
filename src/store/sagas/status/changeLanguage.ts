import { call, spawn, put, takeEvery, select } from "redux-saga/effects";

import Cookies from 'js-cookie';

import instanceI18n from 'language/i18n';

import * as actionsStatus from "store/actions/status";
import {StateRoot} from 'store/reducers';




function* changeLanguage(action: actionsStatus.type__CHANGE_LANGUAGE) {
    
    
    let languageReplacement:string = '';
    
    if (action.payload?.replacement){
       languageReplacement = action.payload.replacement;
    }
    
    else {
        const languagePrevious:string =  yield select( (state:StateRoot) => state.status.current.language ); 
        
        if (languagePrevious === 'en'){
            languageReplacement = 'ko';
        } 
        else {
            languageReplacement = 'en';
        }
    }
    
    instanceI18n.changeLanguage(languageReplacement);
    
    yield put( actionsStatus.return__REPLACE({
        listKey: ['current', 'language'],
        replacement: languageReplacement
    }) );
    
    // Cookies.set('languageCurrent', languageReplacement, { expires: 7, path: '/' });    
    // go to home
        
}

export default changeLanguage;
