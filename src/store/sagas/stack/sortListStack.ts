import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";

import calculateHp from 'tools/others/calculateHp';



function* sortListStack(action: actionsStack.type__SORT_LIST_STACK) {

    const {sorting: {property, direction}} = action.payload;

    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const listStack = yield select( (state:StateRoot) => state.stack.listStack);

    try {

        let listStackNew: actionsStack.Stack[] = [...listStack];
        
            listStackNew.sort((portalLeft, portalRight) =>{
                
                if (property === 'name') { 

                    const {name: nameLeft} = portalLeft;
                    const {name: nameRight} = portalRight;

                    if (direction === 'ascending') {
                        if  (nameLeft <= nameRight) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    else {
                        if  (nameLeft <= nameRight) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
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
                listKey: ['loading', 'listStack'],
                replacement: false
            }) );

            yield put( actionsStatus.return__REPLACE({
                listKey: ['ready', 'listStack'],
                replacement: true
            }) );


    } catch (error) {
        
        console.log(error);
        console.log('sortListStack has been failed');
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['ready', 'listStack'],
            replacement: false
        }) );
        
        yield put( actionsStatus.return__REPLACE({
            listKey: ['loading', 'listStack'],
            replacement: false
        }) );

        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'SortListStack_UnknownError__E'
        }) );
    }
}

export default sortListStack;
