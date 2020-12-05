import { call, spawn, put, takeEvery, select } from "redux-saga/effects";

import Cookies from 'js-cookie';
import store from 'tools/vanilla/store';

import instanceI18n from 'language/i18n';

import * as actionsStatus from "store/actions/status";
import {StateRoot} from 'store/reducers';


// action: actionsStatus.type__READ_LANGUAGE

function* readLanguage() {
    
    
    const languageI18next:string = store.get('i18nextLng');
    
    if (languageI18next !== undefined){
      
      // https://github.com/ladjs/i18n-locales     list of codes
      let replacement = '';
      if (languageI18next === 'ko' || 'ko-KR'){
        replacement = 'ko';
      }
      else {
        replacement = 'en';
      }
      
      yield put( actionsStatus.return__REPLACE({
        listKey:['current', 'language'],
        replacement: replacement
      }))
    };
    
        
}

export default readLanguage;
