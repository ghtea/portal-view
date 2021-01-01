import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";
import * as actionsPortal from "store/actions/portal";




function* addWholePortalsToStacks(action: actionsStack.type__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS) {
    
    try {
        //const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
        const idUserInApp = yield select((state:StateRoot)=>state.auth.user?.id);

        const listPortal:actionsPortal.Portal[] = yield select((state:StateRoot)=>state.portal.listPortal);
        const listStack:actionsStack.Stack[] = yield select((state:StateRoot)=>state.stack.listStack);

        let listStackNew = []
        for (const stackEach of listStack){

            let stackEachNew = stackEach;
            const {listIdPortal} = stackEach;

            let kindAction: 'normal' | 'search' = 'normal';
            let listPortalInCurrentStack: actionsPortal.Portal[] = [];
            for (const idPortal of listIdPortal){
                const portalInThisStack = listPortal.find(portalEach => portalEach.id === idPortal);
                if (portalInThisStack){
                    listPortalInCurrentStack.push(portalInThisStack);
                }
                if (portalInThisStack?.kind === 'search'){
                    kindAction = 'search';
                }
            }
            
            stackEachNew = {
                ...stackEach,
                listPortal: listPortalInCurrentStack,
                kindAction: kindAction,
            }
            listStackNew.push(stackEachNew);
        }

        yield put(actionsStack.return__REPLACE({
            listKey: ['listStack'],
            replacement: listStackNew
        }));

        const property =  yield select( (state:StateRoot) => state.status.current.stack.sorting.property); 
        const direction =  yield select( (state:StateRoot) => state.status.current.stack.sorting.direction[property as 'name' | 'dateVisited']); 
 
        yield put (actionsStack.return__SORT_LIST_STACK({ 
            property: property,
            direction: direction,
        }));
                    

    } catch (error) {
        
        console.log(error);
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'AddWholePortalsToStacks_UnknownError__E'
        }) );
    }
}

export default addWholePortalsToStacks;
