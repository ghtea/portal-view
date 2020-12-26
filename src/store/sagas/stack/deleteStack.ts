import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";
//import * as actionsTheme from "../../actions/theme";





const requestDeleteStack = (id:string) => {
    return firebaseFirestore.collection("Stack_").doc(id).delete();
};


function* deleteStack(action: actionsStack.type__DELETE_STACK) {

    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 
    
    const { id, idUser} = action.payload;
    
    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (idUser !== idUserInApp){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'Stack_NotOwner__E'
                }));        }
        else {
            
            try {
                
                yield call( requestDeleteStack , id );
                // await storageService.refFromURL(nweetObj.attachmentUrl).delete();

                
                yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'DeleteStack_Succeeded__S'
                }));
                /*
                yield put(actionsStatus.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'creatingStack'], 
                    replacement: false
                }));
                */      
                yield put(actionsStack.return__GET_LIST_STACK({
                    idUser: idUser
                }));
                // window.location.reload();
            }

            catch (error){ 
                
                console.log(error);
                console.log('error occurred in firebase server')
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'DeleteStack_UnknownError__E'
                }) );
            }
              
        }

    } catch (error) {
        
        console.log(error);
        console.log('deleteStack has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'DeleteStack_UnknownError__E'
        }) );
    }
}

export default deleteStack;
