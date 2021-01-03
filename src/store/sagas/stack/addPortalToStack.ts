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
    
    const {kind, idPortal, nameStack, listIdStack: listIdStackNew} = action.payload;

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        
        else if ( (kind === 'new') && (!nameStack) ){
            console.log('name for new stack is needed')
        }
        else if ( (kind === 'existing') && (!listIdStackNew) ) {
            console.log('list of id of stack is needed')
        }

        else {

            const date = Date.now();


            if (kind === 'new'){
                
                let stack:any = {
                    idUser: idUserInApp, 

                    kind: 'manual',
                    name: nameStack as string,
                    
                    listTag: [],
                    listIdPortalManual: [idPortal],
                };

                yield put(actionsStack.return__MANIPULATE_STACK({
                    kind: 'create',
                    draft: stack
                }))

            }
            else if (kind === 'existing') {

                const listStack: actionsStack.Stack[] = yield select ( (state:StateRoot) => state.stack.listStack); 
                // const stackEditing = listStack.find((stack:any) => stack.id === idStack);
                console.log(listStack)
                for (var iStack = 0; iStack < listStack?.length; iStack++){

                    const stackEach = listStack[iStack];
                    let listIdPortalNewEach = stackEach.listIdPortalManual;

                    if ( listIdStackNew?.includes(stackEach['id'])  ) { 
                        listIdPortalNewEach = listIdPortalNewEach.filter((idPortalEach:string) => idPortalEach !== idPortal); // 중복입력 방지  
                        listIdPortalNewEach.push(idPortal);
                    }
                    else {
                        listIdPortalNewEach = listIdPortalNewEach.filter((idPortalEach:string) => idPortalEach !== idPortal);
                    }
                    
                    let update: any = {
                        listIdPortalManual: listIdPortalNewEach
                    };

                    yield put(actionsStack.return__MANIPULATE_STACK({
                        kind: 'update',
                        draft: update,
                        id: stackEach['id']
                    }));
                }    

            }

            yield put(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', 'addingPortalToStack'], 
                replacement: false
            }));

              
        }

    } catch (error) {
        
        console.log(error);
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'AddPortalToStack_UnknownError__E'
        }) );
    }
}

export default addPortalToStack;
