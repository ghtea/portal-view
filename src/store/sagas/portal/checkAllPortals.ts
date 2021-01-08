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


function* checkAllPortals(action:actionsPortal.type__CHECK_ALL_PORTALS) {
    
    try {
        
        const {listPortal} = action.payload;

        for ( const [iEachPortal, portal] of listPortal.entries() ){
            //console.log(portal)
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

                dateVisited,
                dateStamped,
                dateChecked,
                dateUpdated,
                dateCreated,

                listTag,
                hue,
            } = portal;


            const dateNow = Date.now();

            const dateCheckedUsing = dateChecked || dateCreated;
            const dateStampedUsing = dateStamped || dateCreated;

            const hoursSinceChecked = (dateNow - dateCheckedUsing) / (1000 * 60 * 60);
            const hoursSinceStamped = (dateNow - dateStampedUsing) / (1000 * 60 * 60);

            if (hoursSinceChecked > 1) {

                let update = {};

                let listBooleanVisitedNew:boolean[] = [...listBooleanVisited];

                const hoursGapStandard = 20;
                if (hoursSinceStamped > hoursGapStandard) {   
                    let listToAdd:boolean[] = [];
                    listToAdd.push(false);
                    
                    let hoursBetweenRemaining = hoursSinceStamped - 24;
                    
                    for (var i = 0; i < lifespan; i++ ) {
                        if (hoursBetweenRemaining > hoursGapStandard){
                            
                            hoursBetweenRemaining -= 24;
                            
                            listToAdd.push(false);
                        }
                    }
                    listBooleanVisitedNew = listToAdd.concat(listBooleanVisited);

                    console.log(listBooleanVisitedNew);
                    for (var i = 0; i < lifespan; i++ ) {
                        if (listBooleanVisitedNew.length > lifespan){
                            listBooleanVisitedNew.pop();
                        }
                    }

                    update = {
                        listBooleanVisited: listBooleanVisitedNew,
                        dateStamped: dateNow,
                        dateChecked: dateNow,
                    };

                }
                else { // no stamp changes

                    update = {
                        dateChecked: dateNow,
                    };
                }
                

                let triggering = false;
                if (iEachPortal === listPortal.length){
                    triggering = true;
                }

                yield put (actionsPortal.return__MANIPULATE_PORTAL({
                    kind: 'update',
                    draft: update,
                    id: id,
                    idOwner: idUser,
                    triggering: triggering,
                }));

            }
            
            else {
                // dont need to chekc & update
            }

    
        } // for loop

        // return__MANIPULATE_PORTAL 에서 한개씩 따로 state 변경

        const property =  yield select( (state:StateRoot) => state.status.current.portal.sorting.property); 
        const direction =  yield select( (state:StateRoot) => state.status.current.portal.sorting.direction[property as 'hp' | 'dateVisited']); 
 
        yield put (actionsPortal.return__SORT_LIST_PORTAL({ 
            property: property,
            direction: direction,
        }));

    
    } catch (error) {
        
        console.log(error);

        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'CheckAllPortals_UnknownError__E'
        }) );

    }
}

export default checkAllPortals;
