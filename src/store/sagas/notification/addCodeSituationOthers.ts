import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsNotification from "store/actions/notification";
import {StateRoot} from 'store/reducers';

import catalogSituation, {KindSituation} from 'language/catalogSituation';


function* addCodeSituationOthers(action: actionsNotification.type__ADD_CODE_SITUATION_OTHERS) {
    
    const listCodeSituationOthersPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationOthers ); 
      
    
    const listCodeSituationOthersNew = [action.payload.codeSituation, ...listCodeSituationOthersPrevious];
        
        
    yield put( actionsNotification.return__REPLACE({
        listKey: ['listCodeSituationOthers'],
        replacement: listCodeSituationOthersNew
    }) );
    
}

export default addCodeSituationOthers;
