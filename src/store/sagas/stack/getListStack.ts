import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";


const requestGetListStack = (idUser:string) => {
    
    return firebaseFirestore.collection("Stack_")
    .where("idUser", "==", idUser)
    .get()
};


function* getListStack(action: actionsStack.type__GET_LIST_STACK) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    
    try {

        // !readyUser
        if (false){
            console.log("should log in first");

        }
        else {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user?.id); 

            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'listStack'],
                replacement: false
            }) );
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['loading', 'listStack'],
                replacement: true
            }) );

            
            try {
                const data =  yield call( requestGetListStack, idUser );
                
                const listStack:any[] = data.docs.map((document: any)=>(
                    {
                        ...document.data(),
                        id: document.id
                    }
                ));
               
                    // data.map 으로 하면 잘 안된다...
                
                console.log(listStack);

                yield put( actionsStack.return__REPLACE({
                    listKey: ['listStack'],
                    replacement: listStack
                }) );

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'listStack'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'listStack'],
                    replacement: true
                }) );

            }
            catch (error) {   

                yield put( actionsStatus.return__REPLACE({
                    listKey: ['loading', 'listStack'],
                    replacement: false
                }) );
                
                yield put( actionsStatus.return__REPLACE({
                    listKey: ['ready', 'listStack'],
                    replacement: false
                }) );

                console.log(error)
                console.log('error occurred in firebase server')
                
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'GetListStack_UnknownError__E'
                }) );
            }
              
        
        } // higher else
    

    } catch (error) {
        
        console.log(error);
        console.log('getListStack has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'GetListStack_UnknownError__E'
        }) );
    }
}

export default getListStack;
