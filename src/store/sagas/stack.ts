import { takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';
import getListStack from 'store/sagas/stack/getListStack';
import sortListStack from 'store/sagas/stack/sortListStack';

import manipulateStack from 'store/sagas/stack/manipulateStack';
import deleteStack from 'store/sagas/stack/deleteStack';
import addPortalToStack from 'store/sagas/stack/addPortalToStack';
import visitStack from 'store/sagas/stack/visitStack';
import addWholePortalsToStacks from 'store/sagas/stack/addWholePortalsToStacks';

import * as actionsStack from "../actions/stack";


export default function* sagaStack() {
    
    yield takeLatest( actionsStack.name__GET_LIST_STACK, getListStack ); 
    yield takeLatest( actionsStack.name__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS, addWholePortalsToStacks) ;

    yield takeLatest( actionsStack.name__SORT_LIST_STACK, sortListStack ); 


    yield takeEvery( actionsStack.name__ADD_PORTAL_TO_STACK, addPortalToStack ); 
    yield takeEvery( actionsStack.name__MANIPULATE_STACK, manipulateStack ); 
    yield takeEvery( actionsStack.name__DELETE_STACK, deleteStack ); 
    yield takeEvery( actionsStack.name__VISIT_STACK, visitStack ); 
}

