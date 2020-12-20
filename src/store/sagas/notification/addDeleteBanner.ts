import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsNotification from "store/actions/notification";
import {Banner} from "store/reducers/notification";
import {StateRoot} from 'store/reducers';

import { v4 as uuidv4 } from 'uuid';


function* addDeleteBanner(action: actionsNotification.type__ADD_DELETE_BANNER) {
    
    const listBannerPrevious: Banner[] =  yield select( (state:StateRoot) => state.notification.listBanner ); 
        
    const id = uuidv4();
    /*
    let id:string = '';
    
    if (action.payload.id){
      id = action.payload.id;
    }
    else {
      id = uuidv4();
    }
    */
    
    const codeSituation: string = action.payload.codeSituation;
    
    let kindSituation: actionsNotification.KindSituation = 'warning';
    if (codeSituation.match(/__S$/)){
        kindSituation = 'success';
    }
    else if (codeSituation.match(/__H$/)){
        kindSituation = 'hint';
    }
    else if (codeSituation.match(/__W$/)){
        kindSituation = 'warning';
    }
    else if (codeSituation.match(/__E$/)){
        kindSituation = 'error';
    }
    
    //catalogSituation[codeSituation]['kind'];
    
    const idMessage: string = `Notification.${codeSituation}`;
    //console.log(message);
    
    
    let levelTimeBanner:actionsNotification.LevelTimeBanner = 'normal';
    
    
    if ( kindSituation === 'success'){
      levelTimeBanner = 'short';
    }
    else if ( kindSituation === 'hint'){
      levelTimeBanner = 'normal';
    }
    else if ( kindSituation === 'error'){
      levelTimeBanner = 'long';
    }
    else if ( kindSituation === 'warning'){
      levelTimeBanner = 'normal';
    }
    
    let msTime: actionsNotification.MsTimeBanner = actionsNotification.MsTimeBanner[levelTimeBanner];
    
    const bannerAdding = {
      id: id,  
      codeSituation: codeSituation, 
      kindSituation: kindSituation,
      idMessage: idMessage,
      msTime: msTime 
    }
    
    const listBannerNew = [bannerAdding, ...listBannerPrevious];
        
        
    yield put( actionsNotification.return__REPLACE({
        listKey: ['listBanner'],
        replacement: listBannerNew
    }) );
    
    
    yield delay( msTime );

    yield put( actionsNotification.return__DELETE_BANNER({
        id: id
    }) );
    
    
}

export default addDeleteBanner;
