import { call, spawn, put, takeEvery, select } from "redux-saga/effects";

import Cookies from 'js-cookie';

import instanceI18n from 'language/i18n';

import * as actionsStatus from "store/actions/status";
import {StateRoot} from 'store/reducers';




function* readOptionTheme(action: actionsStatus.type__READ_OPTION_THEME) {
    
    const optionThemeCookie:string | undefined = Cookies.get('optionTheme');
    
    console.log(optionThemeCookie);
    
    if (typeof optionThemeCookie === 'string'){
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['current', 'theme', 'option'],
            replacement: optionThemeCookie
        }) );
        
        yield put( actionsStatus.return__DECIDE_THEME() );
    }
        
}

export default readOptionTheme;
