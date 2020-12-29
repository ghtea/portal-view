import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

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
    
    return firebaseFirestore.doc(`Portal_/${id}`).update({
      ...update
    });
};


function* visitPortal(action: actionsPortal.type__VISIT_PORTAL) {
    
    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 

    const listPortal =  yield select( (state:StateRoot) => state.portal.listPortal); 
    const portalVisiting = listPortal.find((portal:actionsPortal.Portal) => portal.id === action.payload.id)

    const stringSearching = action.payload.stringSearching;
    const {
        id,
        idUser,   //  normal, search
        kind,
                
        name,
        initials,
        url,
        
        lifespan,
        listBooleanVisited,  // [true, false, ...(30days)] 

        dateVisited,
        dateStamped,
        dateChecked,
        dateUpdated,
        dateCreated,

        listTag,
        hue
    } = portalVisiting;
    

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

            const dateNow = Date.now();

            const dateCheckedUsing = dateChecked || dateCreated;
            const dateStampedUsing = dateStamped || dateCreated;

            const hoursSinceChecked = (dateNow - dateCheckedUsing) / (1000 * 60 * 60);
            const hoursSinceStamped = (dateNow - dateStampedUsing) / (1000 * 60 * 60);


            let listBooleanVisitedNew:boolean[] = [...listBooleanVisited];

            const hoursGapStandard = 20;
            if (hoursSinceStamped > hoursGapStandard) {   
                let listToAdd:boolean[] = [];
                listToAdd.push(true);
                
                let hoursBetweenRemaining = hoursSinceChecked - 24;
                
                for (var i = 0; i < lifespan; i++ ) {
                    if (hoursBetweenRemaining > hoursGapStandard){
                        
                        hoursBetweenRemaining -= 24;
                        
                        listToAdd.push(false);
                    }
                }
                listBooleanVisitedNew = listToAdd.concat(listBooleanVisited);
                for (var i = 0; i < lifespan; i++ ) {
                    if (listBooleanVisitedNew.length > lifespan){
                        listBooleanVisitedNew.pop();
                    }
                }
            }
            else {
                listBooleanVisitedNew[0] = true;
            }
                
            console.log(listBooleanVisitedNew);

            const update = {
                listBooleanVisited: listBooleanVisitedNew,
                dateVisited: dateNow,
                dateChecked: dateNow,
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
                
                window.open(urlUsing, `id_${dateNow}`);

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
