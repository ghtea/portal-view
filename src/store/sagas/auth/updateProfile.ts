import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseAuth, firebaseFs, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsAuth from "store/actions/auth";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
//import * as actionsTheme from "../../actions/theme";

const uploadPhoto = (refFirebase: any, urlPhotoLocal: string) => {
    return refFirebase.putString(urlPhotoLocal, "data_url")
}
const getUrlPhotoFirebase = (response: any) => {
    return response.ref.getDownloadURL()
}
const updateProfileFirebase = (update: any) => {
    return firebaseAuth?.currentUser?.updateProfile(update)
}

function* updateProfile(action: actionsPortal.type__CREATE_PORTAL) {

    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 
   
    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        /*
        else if (action.payload.initials.length > 3) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_InitialsTooLong__E'
            }) );
        }
        */
        else {
            // let userFirebase = firebaseAuth.currentUser;
            const {payload: {displayName, urlPhotoLocal}} = action;
                        
            let update: any = {};

            if (displayName){
                update['displayName'] = displayName;
            }

            if (urlPhotoLocal){
                const refFirebase = firebaseStorage
                .ref()
                .child(`${idUserInApp}/${uuidv4()}`);

                const response = yield call( uploadPhoto, refFirebase, urlPhotoLocal); // upload photo
                const urlPhotoFirebase = yield call (getUrlPhotoFirebase, response);

                update['photoURL'] = urlPhotoFirebase;
            }

            yield call (updateProfileFirebase, update);
            yield put (actionsAuth.return__REPLACE_USER());

            console.log('updateProfile worked successfully!');
            
        }

    } catch (error) {
        
        console.log(error);
        console.log('updateProfile has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'UnknownError__E'
        }) );
    }
}

export default updateProfile;
