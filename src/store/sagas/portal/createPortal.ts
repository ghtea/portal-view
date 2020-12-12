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
    _id: string;
    kind: string;   //  basic, search, both
    user: string;   // 이 링크 이용 하는 유저 
    
    name: string;
    url: string;  
    tags: string[];
}

const requestCreatePortal = (bodyRequest: BodyRequest) => {
    
    return axios.post(`${process.env.REACT_APP_URL_BACK}/portal/create`, bodyRequest)
    
        .then(response => { 
        	//console.log(response)
        	return response;
        })
        .catch(error => {
            //console.log(error.response)
            return error.response;
        });
};


function* CreatePortal(action: actionsPortal.type__CREATE_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    
    try {

        if (!readyUser){
            console.log("should log in first");

        }
        else if (action.payload.name === "") {
            console.log('type email address');
            
        }
        else if (action.payload.url === "" ) {
            console.log('type url');
            
        }
        
        else {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user._id); 

            const bodyRequest = {
                _id: uuidv4(),
                kind: action.payload.kind,
                user: idUser,
                
                name: action.payload.name,
                url: action.payload.url,
                tags: action.payload.tags
            };
            
           
            const {response, error} = yield call( requestCreatePortal, bodyRequest );

            if (response && response.data.codeSituation === 'CreatePortal_Succeeded'){
                yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'CreatePortal_Succeeded'
                }))

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
        console.log('Creating portal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'CreatePortal_UnknownError'
        }) );
    }
}

export default CreatePortal;
