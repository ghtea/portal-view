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


function* visitPortal(action: actionsPortal.type__VISIT_PORTAL) {

    const {
        id,
        idUser,   //  normal, search
        kind,
                
        name,
        initials,
        url,
        
        lifespan,
        listBooleanVisited,  // [true, false, ...(30days)] 
        dateVisitedLast, 
        dateCreated,

        listTag,
        hue
    } = action.payload.portal;
    
    const stringSearching = action.payload.stringSearching;
    console.log(action.payload)
    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp: boolean =  yield select( (state:StateRoot) => state.auth.user?.id); 

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (idUserInApp !== idUser){
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
                let urlUsing = url;
                if (kind === 'search'){
                    urlUsing = encodeURI(url.replace(/{search}/, stringSearching));
                }
                
                // because ios blocks window.open (sometimes maybe)
                if (typeof (window.open) == "function") {
                    window.open("http://www.stackoverflow.com");
                }
                else {
                    alert('using new way')
                    window.location.href = "http://www.stackoverflow.com";
                }

                // history.push('/');
                
                yield put(actionsPortal.return__GET_LIST_PORTAL({
                    idUser: idUser
                }));
                // window.location.reload();
            }

            catch (error){ 
                
                console.log(error);
                console.log('error occurred in firebase server')
                
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'VisitPortal_UnknownError__E'
                }) );
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
