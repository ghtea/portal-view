import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";


const requestGetListPortal = (idUser:string) => {
    
    return firebaseFirestore.collection("Portal_")
    .where("idUser", "==", idUser)
    .get()
};


function* getListPortal(action: actionsPortal.type__GET_LIST_PORTAL) {

    const {idUser} = action.payload;

    try {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user?.id); 

            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'listPortal'],
                replacement: false
            }) );
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['loading', 'listPortal'],
                replacement: true
            }) );

            
            const data =  yield call( requestGetListPortal, idUser );
            
            const listPortal:actionsPortal.Portal[] = data.docs.map((document: any)=>(
                {
                    ...document.data(),
                    id: document.id
                }
            ));
            
            //checkAllPortals(listPortal);
                console.log()
            yield put( actionsPortal.return__REPLACE({
                listKey: ['listPortal'],
                replacement: listPortal
            }) );

            yield put( actionsPortal.return__CHECK_ALL_PORTALS({
                listPortal: listPortal
            }) );

    

    } catch (error) {
        
        console.log(error)

        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'GetListPortal_UnknownError__E'
        }) );
    }
}

export default getListPortal;
