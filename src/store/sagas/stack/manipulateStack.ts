import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";
//import * as actionsTheme from "../../actions/theme";



const requestCreateStack = (stack: Partial<actionsStack.Stack>) => {
    return firebaseFirestore.collection("Stack_").add(stack) 
};
const requestUpdateStack = (id:string, update:any) => {
    return firebaseFirestore.doc(`Stack_/${id}`).update({
      ...update
    });
};


function* manipulateStack(action: actionsStack.type__MANIPULATE_STACK) {

    const {kind, draft, id} = action.payload;
    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp = yield select((state:StateRoot)=>state.auth.user?.id);

    const listStack = yield select ( (state:StateRoot) => state.stack.listStack); 
    const stackEditing = listStack.find((stack:any) => stack.id === id);

    const history = yield getContext('history');
    

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        } 
        else if ( (kind === 'update') && (idUserInApp !== stackEditing.idUser) ){
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Stack_NotOwner__E'
            }) );  
        }
        else if ( (kind === 'update') && !id ) {
            console.log('id of stack needed')
        }

        else {
            const idUserInApp: string =  yield select( (state:StateRoot) => state.auth.user?.id); 


            const date = Date.now();

            if ( draft.kind === 'tag' ){
                draft.name = '';
            }

            if (kind === 'create'){

                let stack:Partial<actionsStack.Stack> = {

                    idUser: idUserInApp, 

                    kind: draft.kind,
                    name: draft.name,
                    
                    listTag: draft.listTag,
                    listIdPortalManual: draft.listIdPortalManual,

                    dateCreated: date,
                };

                try {
                    const data =  yield call( requestCreateStack , stack );
                    console.log(data);
                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'CreateStack_Succeeded__S'
                    }));
                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'creatingStack'], 
                        replacement: false
                    }));
                    history.push('/');
                    yield put(actionsStack.return__GET_LIST_STACK({
                        idUser: idUserInApp
                    }));
                    // window.location.reload();
                }
                catch (error){ 
                    console.log(error);
                    console.log('error occurred in firebase server');
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'CreateStack_UnknownError__E'
                    }) );
                }
            }

            else if (kind === 'update') {

                let update:Partial<actionsStack.Stack> = {
                    ...draft,
                    dateCreated: date,
                };

                try {
                    yield call( requestUpdateStack, id as string, update );
                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'UpdateStack_Succeeded__S'
                    }));
                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'addingPortalToStack'], 
                        replacement: false
                    }));
                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'creatingStack'], 
                        replacement: false
                    }));
                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'editingStack'], 
                        replacement: false
                    }));
                    // history.push('/');
                    yield put(actionsStack.return__GET_LIST_STACK({
                        idUser: idUserInApp
                    }));
                    // window.location.reload();
                }
                catch (error){ 
                    console.log(error);
                    console.log('error occurred in firebase server');
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'UpdateStack_UnknownError__E'
                    }) );
                }
            }

              
        }

    } catch (error) {
        
        console.log(error);
        let codeSituation = 'UnknownError__E';
        if (kind === 'create'){
            codeSituation = 'CreateStack_UnknownError__E'
        }
        else if (kind === 'update'){
            codeSituation = 'UpdateStack_UnknownError__E'
        }
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: codeSituation
        }) );
    }
}

export default manipulateStack;
