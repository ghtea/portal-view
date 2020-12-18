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
    
    _id: string;
    user: string;   //  normal, search
    kind: string;
             
    name: string;
    initials: string;
    url: string;
    
    life: number;

    tags: string[];
    hue: string;
}


const requestCreatePortal = (bodyRequest: BodyRequest) => {
    
    return axios.post(`${process.env.REACT_APP_URL_BACK}/portal`, bodyRequest)
    .then(response => { 
        //console.log(response)
        return ({response});
    })
    .catch(error => {
        //console.log(error.response)
        return ({error});
    });
};


function* createPortal(action: actionsPortal.type__CREATE_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const history = yield getContext('history');
    
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
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user._id); 

            const bodyRequest = {
                _id: uuidv4(),
                user: idUser,
                
                kind: action.payload.kind,
                        
                name: action.payload.name,
                initials: initials,
                url: action.payload.url,
                
                life: action.payload.life,

                tags: action.payload.tags,
                hue: hue
            };
            
           
            const {response, error} = yield call( requestCreatePortal, bodyRequest );

            console.log(response);
            console.log(error);

            if (response){
                const codeSituation = response.data.codeSituation;
                
                if (codeSituation === 'CreatePortal_Succeeded') {
                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'CreatePortal_Succeeded'
                    }));

                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'creatingPortal'], 
                        replacement: false
                    }));

                    history.push('/');
                    
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
        console.log('createPortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'CreatePortal_UnknownError'
        }) );
    }
}

export default createPortal;
