import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsNotification from "store/actions/notification";
import {Banner} from "store/reducers/notification";
import {StateRoot} from 'store/reducers';

import { v4 as uuidv4 } from 'uuid';

import instanceI18n from 'language/i18n';
import catalogSituation, {KindSituation} from 'language/catalogSituation';


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
    
    const kindSituation: KindSituation = catalogSituation[codeSituation]['kind'];
    
    const message: string = instanceI18n.t(`Notification.${codeSituation}`);
    console.log(message);
    
    
    let levelTimeBanner:actionsNotification.LevelTimeBanner = 'normal';
    
    
    if ( kindSituation === 'success'){
      levelTimeBanner = catalogSituation[codeSituation]['levelTimeBanner'] || 'short';
    }
    else if ( kindSituation === 'hint'){
      levelTimeBanner = catalogSituation[codeSituation]['levelTimeBanner'] || 'normal';
    }
    else if ( kindSituation === 'error'){
      levelTimeBanner = catalogSituation[codeSituation]['levelTimeBanner'] || 'long';
    }
    else if ( kindSituation === 'warning'){
      levelTimeBanner = catalogSituation[codeSituation]['levelTimeBanner'] || 'normal';
    }
    
    let msTime: actionsNotification.MsTimeBanner = actionsNotification.MsTimeBanner[levelTimeBanner];
    
    const bannerAdding = {
      id: id,  
      codeSituation: codeSituation, 
      kindSituation: kindSituation,
      message: message,
      msTime: msTime 
    }
    
    const listBannerNew = [bannerAdding, ...listBannerPrevious];
        
        
    yield put( actionsNotification.return__REPLACE({
        listKey: ['listBanner'],
        replacement: listBannerNew
    }) );
    
    if (levelTimeBanner !== 'lasting'){
      yield delay( msTime );
    
      yield put( actionsNotification.return__DELETE_BANNER({
          id: id
      }) );
    }
    
}

export default addDeleteBanner;
