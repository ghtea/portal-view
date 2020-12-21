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


const requestEditPortal = (id:string, update:any) => {
    
    return firebaseFs.doc(`Portal_/${id}`).update({
      ...update
    });
};


function* editPortal(action: actionsPortal.type__CREATE_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp: boolean =  yield select( (state:StateRoot) => state.auth.user.id); 

    const history = yield getContext('history');
    
    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (idUserInApp !== action.payload.idUser){
            console.log('your are not author of this portal');
        }
        else if (action.payload.name === "") {
            console.log('type name');
            
        }
        
        else if (action.payload.url === "" ) {
            console.log('type url');
        }

        else if (action.payload.initials.length > 3) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_InitialsTooLong__E'
            }) );
        }

        else {

            // initials
            let initials = action.payload.initials;
            if (initials === "" ) {
                initials = action.payload.name[0];
            }

            // hue
            let hue = action.payload.hue;
            if (hue === 'random'){
                const listHue = [
                    '0', '10', '20', '30', '40', '50', '60', '70', '80', '90',
                    '100', '110', '120', '130', '140', '150', '160', '170', '180', '190',
                    '200', '210', '220', '230', '240', '250', '260', '270', '280', '290',
                    '300', '310', '320', '330', '340', '350', 'grey'
                ]
                hue = listHue[Math.floor(Math.random() * listHue.length)]; 
            }
            //let listBooleanVisited:boolean[] = Array(action.payload.lifespan-1).fill(false);
            //listBooleanVisited.unshift(true);

            const date = Date.now();
            const update = {

                kind: action.payload.kind,
                     
                name: action.payload.name,
                initials: initials,
                url: action.payload.url,
                
                lifespan: parseInt(action.payload.lifespan),
                
                listTag: action.payload.listTag,
                hue: hue,

                dateUpdated: date 
            };
            
            try {
                const data =  yield call( requestEditPortal , action.payload.id, update );

                console.log(data);

                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'EditPortal_Succeeded__S'
                    }));

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
        console.log('editPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'EditPortal_UnknownError__E'
        }) );
    }
}

export default editPortal;
