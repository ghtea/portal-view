import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsNotification from "store/actions/notification";
import {StateRoot} from 'store/reducers';

import catalogSituation, {KindSituation} from 'language/catalogSituation';


function* deleteCodeSituationSpecial(action: actionsNotification.type__DELETE_CODE_SITUATION_SPECIAL) {
    
    const listCodeSituationSpecialPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationSpecial ); 
      
    
    let listCodeSituationSpecialNew: string[] = listCodeSituationSpecialPrevious;
    
    if (action.payload.codeSituation){
      listCodeSituationSpecialNew = listCodeSituationSpecialPrevious.filter(code => code !== action.payload.codeSituation);
    }
    
    else if (action.payload.regex ){
      listCodeSituationSpecialNew = listCodeSituationSpecialPrevious.filter(code => action.payload.regex?.test(code));
    }
    
    yield put( actionsNotification.return__REPLACE({
        listKey: ['listCodeSituationSpecial'],
        replacement: listCodeSituationSpecialNew
    }) );
    
}

export default deleteCodeSituationSpecial;
