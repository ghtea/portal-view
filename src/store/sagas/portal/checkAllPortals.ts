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


const requestCheckAllPortals = (id:string, update:any) => {
    
    return firebaseFirestore.doc(`Portal_/${id}`).update({
      ...update
    });
};


function* checkAllPortals(action: actionsPortal.type__CHECK_ALL_PORTALS) {
    
    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 

    const listPortal =  yield select( (state:StateRoot) => state.portal.listPortal); 
    
    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        
        else {

            for (const portal of listPortal) {

                const {
                    id,
                    idUser,
                    kind,
                        
                    name,
                                            
                    kindIcon,
                    initials,
                    urlImageIcon,
                    
                    url,
                    
                    lifespan,
                    listBooleanVisited,
                    dateChecked,
                    dateVisitedLast,
                    dateCreated,

                    listTag,
                    hue,
                } = portal;


                const date = Date.now();
                const dateLast = dateVisitedLast || dateCreated;
                const hoursBetween = (date - dateLast) / (1000 * 60 * 60);

                let listBooleanVisitedReplacement:boolean[] = listBooleanVisited;
                const hoursGapStandard = 20;
                if (hoursBetween > hoursGapStandard) {   
                    let listToAdd:boolean[] = [];
                    listToAdd.push(false);
                    
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
                    dateChecked: date
                };

                
                yield put (actionsPortal.return__MANIPULATE_PORTAL({
                    kind: 'update',
                    draft: update,
                    id: id,
                    idOwner: idUser,
                }));

                let listPortalNew = listPortal.filter((portal:actionsPortal.Portal) => portal.id !== id);
                listPortalNew.push({
                    ...portal,
                    ...update,
                })

                yield put (actionsPortal.return__REPLACE({
                    listKey: ['listPortal'],
                    replacement: listPortalNew,
                }));

            }

              
        }
    } catch (error) {
        
        console.log(error);
        console.log('checkAllPortals has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'CheckAllPortals_UnknownError__E'
        }) );
    }
}

export default checkAllPortals;
