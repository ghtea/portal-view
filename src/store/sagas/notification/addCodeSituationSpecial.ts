import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsNotification from "store/actions/notification";
import {StateRoot} from 'store/reducers';

import catalogSituation, {KindSituation} from 'language/catalogSituation';


function* addCodeSituationSpecial(action: actionsNotification.type__ADD_CODE_SITUATION_SPECIAL) {
    
    const listCodeSituationSpecialPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationSpecial ); 
      
    
    const listCodeSituationSpecialNew = [action.payload.codeSituation, ...listCodeSituationSpecialPrevious];
        
        
    yield put( actionsNotification.return__REPLACE({
        listKey: ['listCodeSituationSpecial'],
        replacement: listCodeSituationSpecialNew
    }) );
    
}

export default addCodeSituationSpecial;
