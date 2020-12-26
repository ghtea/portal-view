import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";
//import * as actionsTheme from "../../actions/theme";



const requestCreateStack = (stack: actionsStack.Stack) => {
    return firebaseFirestore.collection("Stack_").add(stack) 
};
const requestUpdateStack = (id:string, update:any) => {
    return firebaseFirestore.doc(`Stack_/${id}`).update({
      ...update
    });
};


function* addPortalToStack(action: actionsStack.type__ADD_PORTAL_TO_STACK) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp = yield select((state:StateRoot)=>state.auth.user?.id);

    const history = yield getContext('history');
    
    const {kind, idPortal, nameStack, idStack} = action.payload;

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        
        else if ( (kind === 'new') && (!nameStack) ){
            console.log('name for new stack is needed')
        }
        else if ( (kind === 'existing') && (!idStack) ) {
            console.log('id of stack is needed')
        }

        else {

            const date = Date.now();


            if (kind === 'new'){
                
                let stack:actionsStack.Stack = {
                    idUser: idUserInApp, 

                    kind: 'manual',
                    name: draft.name,
                    
                    listTag: draft.listTag,
                    listIdPortal: draft.listIdPortal,
                };
                yield put(actionsStack.return__MANIPULATE_STACK({
                    kind: 'create',
                    draft: {
                        name: nameStack
                    }
                }))

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

            else if (kind === 'existing') {

                yield put(actionsStack.return__MANIPULATE_STACK({
                    kind: 'update',
                    draft: {},
                    id: 'idStack'
                }))


                try {
                    yield call( requestUpdateStack, id as string, stack );
                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'UpdateStack_Succeeded__S'
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
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'AddPortalToStack_UnknownError__E'
        }) );
    }
}

export default addPortalToStack;
