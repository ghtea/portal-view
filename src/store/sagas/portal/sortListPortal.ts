import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";

import calculateHp from 'tools/others/calculateHp';



function* sortListPortal(action: actionsPortal.type__SORT_LIST_PORTAL) {

    try {

        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'listPortal'],
            replacement: true
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'listPortal'],
            replacement: false
        }) );

        const {property, direction} = action.payload;

        const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
        const listPortal = yield select( (state:StateRoot) => state.portal.listPortal);


        let listPortalNew: actionsPortal.Portal[] = [...listPortal];
        
            listPortalNew.sort((portalLeft, portalRight) =>{
                
                if (property === 'hp') { 

                    const {ratioHp: ratioHpLeft} = calculateHp(portalLeft.listBooleanVisited);
                    const {ratioHp: ratioHpRight} = calculateHp(portalRight.listBooleanVisited);

                    if (direction === 'ascending') {
                        return (ratioHpLeft - ratioHpRight)
                    }
                    else {
                        return -(ratioHpLeft - ratioHpRight)
                    }
                }
                else if (property === 'dateVisited') { 

                    const {dateVisited: dateVisitedLeft} = portalLeft;
                    const {dateVisited: dateVisitedRight} = portalRight;

                    if (direction === 'ascending') {
                        return (dateVisitedLeft - dateVisitedRight)
                    }
                    else {
                        return -(dateVisitedLeft - dateVisitedRight)
                    }
                }

                else {
                    return 0;
                }

            })
            
            yield put( actionsStatus.return__REPLACE({
                listKey: ['loading', 'listPortal'],
                replacement: false
            }) );

            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'listPortal'],
                replacement: true
            }) );


    } catch (error) {
        
        console.log(error);
        console.log('sortListPortal has been failed');
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'listPortal'],
            replacement: false
        }) );

        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'SortListPortal_UnknownError__E'
        }) );
    }
}

export default sortListPortal;
