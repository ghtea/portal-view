import { call, select, put } from "redux-saga/effects";
import { firebaseFs } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
import { isArray } from "util";


const requestGetListPortal = (idUser:string) => {
    
    return firebaseFs.collection("Portal_")
    .where("idUser", "==", idUser)
    .get()
};


function* getListPortal(action: actionsPortal.type__GET_LIST_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    
    try {

        // !readyUser
        if (false){
            console.log("should log in first");

        }
        else {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user?.id); 

            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'listPortal'],
                replacement: false
            }) );
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['loading', 'listPortal'],
                replacement: true
            }) );

            
            try {
                const data =  yield call( requestGetListPortal, idUser );
                
                const listPortal:any[] = data.docs.map((document: any)=>(
                    {
                        ...document.data(),
                        id: document.id
                    }
                ));
               
                    // data.map 으로 하면 잘 안된다...
                
                console.log(listPortal);

                yield put( actionsPortal.return__REPLACE({
                    listKey: ['listPortal'],
                    replacement: listPortal
                }) );

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'listPortal'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'listPortal'],
                    replacement: true
                }) );

            }
            catch (error) {   

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'listPortal'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'listPortal'],
                    replacement: false
                }) );

                console.log(error)
                console.log('error occurred in firebase server')
                
                /*
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: codeSituation
                }) );
                */
            }
              
        
        } // higher else
    

    } catch (error) {
        
        console.log(error);
        console.log('getListPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'GetListPortal_UnknownError__E'
        }) );
    }
}

export default getListPortal;
