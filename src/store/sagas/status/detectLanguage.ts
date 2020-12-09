import { call, spawn, put, takeEvery, select } from "redux-saga/effects";

import Cookies from 'js-cookie';
import store from 'tools/vanilla/store';

// import instanceI18n from 'language/i18n';

import * as actionsStatus from "store/actions/status";
import {StateRoot} from 'store/reducers';


// ISO 639-1
const returnCodeStandardFromCodeBrowser = (languageBrowser:string):string => {

    if ( ["ko", "ko-kr", "ko-KR"].includes(languageBrowser) ) {
		return "ko";
	}
	
	else if ( ["ja"].includes(languageBrowser) ) {
		return "ja";
	}
	
	else {
		return "en";
	}
} 

// action: actionsStatus.type__READ_LANGUAGE

function* detectLanguage() {
    
    let replacement = 'en';

    const codeLanguageFromBrowser = (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US';

    console.log(codeLanguageFromBrowser);

    const codeStandardFromCookie = Cookies.get("codeLanguageStandard");
    
    // https://www.metamodpro.com/browser-language-codes
    // https://gist.github.com/wpsmith/7604842

    if (!codeStandardFromCookie && codeLanguageFromBrowser) {

        const codeStandard = returnCodeStandardFromCodeBrowser(codeLanguageFromBrowser);
        console.log('codeStandard');
        console.log(codeStandard);
        replacement = codeStandard;
    }
    else if (codeStandardFromCookie) {
        console.log('codeStandardFromCookie');
        console.log(codeStandardFromCookie);
        replacement = codeStandardFromCookie;
    }


    yield put( actionsStatus.return__REPLACE({
        listKey:['current', 'language'],
        replacement: replacement
    }));

}

export default detectLanguage;

    