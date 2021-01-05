import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
//import * as actionsTheme from "../../actions/theme";


const uploadPhoto = (refFirebase: any, urlImageLocal: string) => {
    return refFirebase.putString(urlImageLocal, "data_url")
}
const getUrlPhotoFirebase = (response: any) => {
    return response.ref.getDownloadURL()
}

const requestCreatePortal = (portal: any) => {
    return firebaseFirestore.collection("Portal_").add(portal) 
};
const requestUpdatePortal = (id:string, update:any) => {
    return firebaseFirestore.doc(`Portal_/${id}`).update(update);
};


function* manipulatePortal(action: actionsPortal.type__MANIPULATE_PORTAL) {

    const readyUser: boolean =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp = yield select((state:StateRoot)=>state.auth.user?.id);
    
    const listPortal =  yield select( (state:StateRoot) => state.portal.listPortal); 
    const history = yield getContext('history');
    
    const {kind, draft, id, idOwner, triggering} = action.payload;

    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (draft.name === "") {
            console.log('type name');
        }
        
        else if (draft.url === "" ) {
            console.log('type url');
        }
        else if (draft.kindIcon === 'initials' && draft.initials == ''){
            console.log('type initials');
        }
        else if (draft.kindIcon === 'initials' &&draft.initials.length > 4) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_InitialsTooLong__E'
            }) );
        }
        else if (draft.kindIcon === 'image' && draft.urlImageLocal == ''){
            console.log('upload image');
        }
        else if (draft.kind === 'search' && !(/{search}/).test(draft.url) ) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_NotValidSearchUrl__E'
            }) );        
        }
        else if ( (kind === 'update') && (idUserInApp !== idOwner) ) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_NotOwner__E'
            }) );  
        }
        else if ( (kind === 'update') && !id) {
            console.log('id of portal needed')
        }

        else {

            // initials
            let initials = draft.initials;
            if (initials === "" ) {
                initials = draft.name[0];
            }

            // hue
            let hue = draft.hue;
            if (draft.hueOption === 'random'){
                const listHue = [
                    '0', '10', '20', '30', '40', '50', '60', '70', '80', '90',
                    '100', '110', '120', '130', '140', '150', '160', '170', '180', '190',
                    '200', '210', '220', '230', '240', '250', '260', '270', '280', '290',
                    '300', '310', '320', '330', '340', '350', 'grey'
                ]
                hue = listHue[Math.floor(Math.random() * listHue.length)]; 
            } 
            else if (draft.hueOption === 'grey'){
                hue = 'grey';
            }

            const lifespan = parseInt(draft.lifespan);
            const dateNow = Date.now();

            

            // image
            let urlImageIcon ='';
            if (draft.kindIcon === 'image' && draft.urlImageLocal){
                const refFirebase = firebaseStorage
                .ref()
                .child(`${idUserInApp}/${uuidv4()}`);

                const response = yield call( uploadPhoto, refFirebase, draft.urlImageLocal); // upload photo
                const urlImageFirebase = yield call (getUrlPhotoFirebase, response);

                urlImageIcon = urlImageFirebase;
            }

            if (kind === 'create'){

                let listBooleanVisited:boolean[] = [true]

                for (var i = 1; i < lifespan; i++ ){
                    if (i % 2 === 1){
                        listBooleanVisited.push(false);
                    }
                    else {
                        listBooleanVisited.push(true);
                    }
                }

                let portal:Partial<actionsPortal.Portal> = {

                    idUser: idUserInApp,
                    kind: draft.kind,
                        
                    name: draft.name,

                    kindIcon: draft.kindIcon,
                    initials: initials,
                    urlImageIcon: urlImageIcon,

                    url: draft.url,
                    
                    lifespan: lifespan,
                    listBooleanVisited: listBooleanVisited, 

                    // dateVisited,
                    // dateStamped,
                    // dateChecked,
                    // dateUpdated,
                    dateCreated: dateNow,
                    
                    listTag: draft.listTag,
                    hue: hue,
                };

                try {
                    const data =  yield call( requestCreatePortal , portal );
                     
                    yield put(actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'CreatePortal_Succeeded__S'
                    }));
                    yield put(actionsStatus.return__REPLACE({ 
                        listKey: ['showing', 'modal', 'creatingPortal'], 
                        replacement: false
                    }));         
                    yield put(actionsStatus.return__REPLACE({
                        listKey: ['current', 'portal', 'creating'], 
                        replacement: ''
                    })); 
                    
                    history.push('/');
                    yield put(actionsPortal.return__GET_LIST_PORTAL({
                        idUser: idUserInApp
                    }));
                    // window.location.reload();
                }
                catch (error){ 
                    console.log(error);
                    console.log('error occurred in firebase server');
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'CreatePortal_UnknownError__E'
                    }) );
                }
            }

            else if (kind === 'update') {

                const portalEditing = listPortal.find((portalEach:actionsPortal.Portal) => portalEach.id === id);
                let listBooleanVisitedNew = [...(draft.listBooleanVisited || portalEditing.listBooleanVisited)];

                if (lifespan){
                    while (listBooleanVisitedNew.length > lifespan){
                        listBooleanVisitedNew.pop();
                    }
                    while (listBooleanVisitedNew.length < lifespan){
                        listBooleanVisitedNew.push(false);
                    }
                }

                let update:Partial<actionsPortal.Portal> = {

                    ...(draft.kind && {kind: draft.kind} ),
                    ...(draft.name && {name: draft.name} ),
                    
                    ...(draft.kindIcon && {kindIcon: draft.kindIcon} ),
                    ...(initials && {initials: initials} ),
                    ...(urlImageIcon && {urlImageIcon: urlImageIcon} ),

                    ...(draft.url && {url: draft.url} ),

                    ...(lifespan && {lifespan: lifespan} ),
                    listBooleanVisited: listBooleanVisitedNew,
                    
                    ...(draft.dateVisited && {dateVisited: draft.dateVisited} ),
                    ...(draft.dateStamped && {dateStamped: draft.dateStamped} ),
                    ...(draft.dateChecked && {dateChecked: draft.dateChecked} ),
                    dateUpdated: dateNow,

                    ...(draft.listTag && {listTag: draft.listTag} ),
                    ...(hue && {hue: hue} ),
                }
                
                
                try {
                    yield call( requestUpdatePortal, id as string, update );
                    /*
                        yield put(actionsNotification.return__ADD_DELETE_BANNER({
                            codeSituation: 'UpdatePortal_Succeeded__S'
                        }));
                    */
                    // dont forget these!!!
                    yield put(actionsStatus.return__REPLACE({
                        listKey: ['showing', 'modal', 'editingPortal'], 
                        replacement: false
                    }));            
                    yield put(actionsStatus.return__REPLACE({
                        listKey: ['current', 'portal', 'editing'], 
                        replacement: ''
                    })); 

                    if (triggering === true) {
                        yield put(actionsPortal.return__GET_LIST_PORTAL({
                            idUser: idUserInApp
                        }));
                    } 
                    
                    /*
                    // 수정후 다시 서버에서 불러오는게 아니라, 로컬에서 업데이트한다
                    let listPortalNew = listPortal.filter((portalEach:actionsPortal.Portal) => portalEach.id !== id);
                    listPortalNew.push({
                        ...portalEditing,
                        ...update,
                    })
                    
                    yield put (actionsPortal.return__REPLACE({
                        listKey: ['listPortal'],
                        replacement: listPortalNew,
                    }));
                    */
                    
                    // window.location.reload();
                }
                catch (error){ 
                    console.log(error);
                    console.log('error occurred in firebase server');
                    yield put( actionsNotification.return__ADD_DELETE_BANNER({
                        codeSituation: 'UpdatePortal_UnknownError__E'
                    }) );
                }
            }

              
        }

    } catch (error) {
        
        console.log(error);
        let codeSituation = 'UnknownError__E';
        if (kind === 'create'){
            codeSituation = 'CreatePortal_UnknownError__E'
        }
        else if (kind === 'update'){
            codeSituation = 'UpdatePortal_UnknownError__E'
        }
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: codeSituation
        }) );
    }
}

export default manipulatePortal;
