import { call, select, put, getContext } from "redux-saga/effects";
import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
//import * as actionsTheme from "../../actions/theme";



interface BodyRequest {
   idPortal: string
}


const requestVisitPortal = (bodyRequest: BodyRequest) => {
    
    return axios.put(`${process.env.REACT_APP_URL_BACK}/portal/visit`, bodyRequest)
    .then(response => { 
        //console.log(response)
        return ({response});
    })
    .catch(error => {
        //console.log(error.response)
        return ({error});
    });
};


function* visitPortal(action: actionsPortal.type__VISIT_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    
    try {
        
        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        
        else {

            const idUser: string =  yield select( (state:StateRoot) => state.auth.user?.id); 

            const bodyRequest = {
                idPortal: action.payload.idPortal
            };
            
           
            const {response, error} = yield call( requestVisitPortal, bodyRequest );

            console.log(response);
            console.log(error);

            if (response){
                const codeSituation = response.data.codeSituation;
                
        
                if (codeSituation === 'VisitPortal_Succeeded__S') {
                    /*
                        yield put(actionsNotification.return__ADD_DELETE_BANNER({
                            codeSituation: 'VisitPortal_Succeeded'
                        }));
                    */

                    yield put(actionsPortal.return__GET_LIST_PORTAL({
                        idUser: idUser
                    }));
                    // window.location.reload();
                }
            }
            else {   
                const codeSituation = error.response.data.codeSituation;
                
                console.log(codeSituation);

                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: codeSituation
                }) );
                
            }
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        console.log(error);
        console.log('visitPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'VisitPortal_UnknownError__E'
        }) );
    }
}

export default visitPortal;
