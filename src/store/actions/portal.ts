import { StringLiteral } from "typescript";


export type Portal = {
    id: string;
    idUser: string;   //  normal, search
    kind: string;
        
    name: string;
                            
    kindIcon: string;
    initials: string;
    urlImageIcon: string;
    
    url: string;
    
    lifespan: number;
    listBooleanVisited: boolean[];  // [true, false, ...(30days)] 
    dateChecked: number;
    dateStamped: number;
    dateVisited: number;
    dateCreated: number;
    dateUpdated: number;

    listTag: string[];
    hue: string;
}

export const name__REPLACE: string = `portal/REPLACE`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__REPLACE {
    listKey: (string | number)[];
    replacement: any;
}
export const return__REPLACE = (payload: Payload__REPLACE) => {
    return {
        type: name__REPLACE,
        payload: payload
    }
};
export type type__REPLACE = ReturnType<typeof return__REPLACE>;  // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!



export const name__MANIPULATE_PORTAL = 'portal/MANIPULATE_PORTAL';
type Payload__MANIPULATE_PORTAL = {
    kind: 'create' | 'update',
    draft: any,
    id? : string,
    idOwner?: string,
    triggering?: boolean,
}
export const return__MANIPULATE_PORTAL = (payload: Payload__MANIPULATE_PORTAL) => {
    return {
        type: name__MANIPULATE_PORTAL,
        payload: payload
    }
};
export type type__MANIPULATE_PORTAL = ReturnType<typeof return__MANIPULATE_PORTAL>;




export const name__DELETE_PORTAL = 'portal/DELETE_PORTAL';
interface Payload__DELETE_PORTAL {
    id: string;
    urlImageIcon: string | undefined;
    idUser: string | undefined;
}
export const return__DELETE_PORTAL = (payload: Payload__DELETE_PORTAL) => {
    return {
        type: name__DELETE_PORTAL,
        payload: payload
    }
};
export type type__DELETE_PORTAL = ReturnType<typeof return__DELETE_PORTAL>;



export const name__GET_LIST_PORTAL = 'portal/GET_LIST_PORTAL'; 
interface Payload__GET_LIST_PORTAL {
    idUser: string;
    triggeringCheckAllPortals: boolean;
}
export const return__GET_LIST_PORTAL = (payload: Payload__GET_LIST_PORTAL) => {
    return {
        type: name__GET_LIST_PORTAL,
        payload: payload
    }
};
export type type__GET_LIST_PORTAL = ReturnType<typeof return__GET_LIST_PORTAL>;


export const name__SORT_LIST_PORTAL = 'portal/SORT_LIST_PORTAL'; 
interface Payload__SORT_LIST_PORTAL  {
    property: 'hp' | 'dateVisited';
    direction: 'ascending' | 'descending';
}
export const return__SORT_LIST_PORTAL = (payload: Payload__SORT_LIST_PORTAL) => {
    return {
        type: name__SORT_LIST_PORTAL,
        payload: payload
    }
};
export type type__SORT_LIST_PORTAL = ReturnType<typeof return__SORT_LIST_PORTAL>;


export const name__CHECK_ALL_PORTALS = 'portal/CHECK_ALL_PORTALS'; 
interface Payload__CHECK_ALL_PORTALS  {
    listPortal: Portal[];
}
export const return__CHECK_ALL_PORTALS = (payload:Payload__CHECK_ALL_PORTALS) => {
    return {
        type: name__CHECK_ALL_PORTALS,
        payload: payload,
    }
};  
export type type__CHECK_ALL_PORTALS = ReturnType<typeof return__CHECK_ALL_PORTALS>;



export const name__VISIT_PORTAL: string = `portal/VISIT_PORTAL`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__VISIT_PORTAL {
    id: string,
    stringSearching: string,
}
export const return__VISIT_PORTAL = (payload: Payload__VISIT_PORTAL) => {
    return {
        type: name__VISIT_PORTAL,
        payload: payload
    }
};
export type type__VISIT_PORTAL = ReturnType<typeof return__VISIT_PORTAL>;  // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!

