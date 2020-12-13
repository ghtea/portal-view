import { call, select, put } from "redux-saga/effects";
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
    idUser: string;  
}

const requestGetListPortal = (bodyRequest: BodyRequest) => {
    
    return axios.post(`${process.env.REACT_APP_URL_BACK}/portal`, bodyRequest)
    
        .then(response => { 
        	//console.log(response)
        	return response;
        })
        .catch(error => {
            //console.log(error.response)
            return error.response;
        });
};


function* getListPortal(action: actionsPortal.type__GET_LIST_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    
    try {

        if (!readyUser){
            console.log("should log in first");

        }
        else {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user._id); 

            const bodyRequest = {
                idUser: idUser
            };
            
           
            const {response, error} = yield call( requestGetListPortal, bodyRequest );

            if (response && response.data.codeSituation === 'GetListPortal_Succeeded'){
                
                yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'GetListPortal_Succeeded'
                }))

                yield put( actionsPortal.return__REPLACE({
                    listKey: ['listPortal'],
                    replacement: response.data.payload
                }) );

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
        console.log('getListPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'GetListPortal_UnknownError'
        }) );
    }
}

export default getListPortal;
