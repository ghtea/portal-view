import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFs } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
//import * as actionsTheme from "../../actions/theme";



interface Update {

    kind: string;
             
    name: string;
    initials: string;
    url: string;
    
    lifespan: number; 
    
    listTag: string[];
    hue: string;

    dateUpdated: number;
    
}


const requestVisitPortal = (id:string, update:any) => {
    
    return firebaseFs.doc(`Portal_/${id}`).update({
      ...update
    });
};


function* visitPortal(action: actionsPortal.type__CREATE_PORTAL) {

    const {
        id,
        idUser,   //  normal, search
        
        lifespan,
        listBooleanVisited,  // [true, false, ...(30days)] 
        dateVisitedLast,
        dateCreated
    } = action.payload;
    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp: boolean =  yield select( (state:StateRoot) => state.auth.user?.id); 

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (idUserInApp !== action.payload.idUser){
            console.log('your are not author of this portal');
        }

        else {

            const date = Date.now();
            const dateLast = dateVisitedLast || dateCreated;
            const hoursBetween = (date - dateLast) / (1000 * 60 * 60 * 24);

            let listBooleanVisitedReplacement:boolean[] = listBooleanVisited;
            const hoursGapStandard = 20;
            if (hoursBetween > hoursGapStandard) {   
                let listToAdd:boolean[] = [];
                listToAdd.push(true);
                
                let hoursBetweenRemaining = hoursBetween - 24;
                
                for (var i = 0; i < lifespan; i++ ) {
                    if (hoursBetweenRemaining > hoursGapStandard){
                        
                        hoursBetweenRemaining -= 24;
                        
                        listToAdd.push(false);
                    }
                }
                listBooleanVisitedReplacement = listToAdd.concat(listBooleanVisited);
                console.log(listBooleanVisitedReplacement);
                for (var i = 0; i < lifespan; i++ ) {
                    if (listBooleanVisitedReplacement.length > lifespan){
                        listBooleanVisitedReplacement.pop();
                    }
                }
            };

            const update = {
                listBooleanVisited: listBooleanVisitedReplacement,
                dateVisitedLast: date
            };
            
            try {
                
                yield call( requestVisitPortal , id, update );

                console.log('requestVisitPortal worked well');

                /*
                yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'VisitPortal_Succeeded__S'
                }));
                */
                yield put(actionsStatus.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'editingPortal'], 
                    replacement: false
                }));

                // history.push('/');
                
                yield put(actionsPortal.return__GET_LIST_PORTAL({
                    idUser: action.payload.idUser
                }));
                // window.location.reload();
            }

            catch (error){ 
                
                console.log(error);
                console.log('error occurred in firebase server')
                /*
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: codeSituation
                }) );
                */
            }
              
        }
    } catch (error) {
        
        console.log(error);
        console.log('visitPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'VisitPortal_UnknownError__E'
        }) );
    }
}

export default visitPortal;
