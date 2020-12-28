
import * as actionsPortal from './portal';

export type Stack = {
    id: string;

    idUser: string;   //  normal, search

    kind: string;    
    name: string;

    listTag: string[]
    listIdPortal: string[];

    dateCreated: number;
    dateUpdated: number;


    // based on portals which it contains
    listPortal?: actionsPortal.Portal[];
    kindAction?: 'normal' | 'search';
}


export const name__REPLACE: string = `stack/REPLACE`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
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


export const name__ADD_PORTAL_TO_STACK = 'stack/ADD_PORTAL_TO_STACK';
type Payload__ADD_PORTAL_TO_STACK = {
    kind: 'new' | 'existing',
    idPortal: string,
    nameStack?: string,
    listIdStack?: string[]
}
export const return__ADD_PORTAL_TO_STACK = (payload: Payload__ADD_PORTAL_TO_STACK) => {
    return {
        type: name__ADD_PORTAL_TO_STACK,
        payload: payload
    }
};
export type type__ADD_PORTAL_TO_STACK = ReturnType<typeof return__ADD_PORTAL_TO_STACK>;


export const name__MANIPULATE_STACK = 'stack/MANIPULATE_STACK';
type Payload__MANIPULATE_STACK = {
    kind: 'create' | 'update',
    draft: any,
    id? : string
}
export const return__MANIPULATE_STACK = (payload: Payload__MANIPULATE_STACK) => {
    return {
        type: name__MANIPULATE_STACK,
        payload: payload
    }
};
export type type__MANIPULATE_STACK = ReturnType<typeof return__MANIPULATE_STACK>;




export const name__DELETE_STACK = 'stack/DELETE_STACK';
interface Payload__DELETE_STACK {
    id: string;
    idUser: string | undefined;
}
export const return__DELETE_STACK = (payload: Payload__DELETE_STACK) => {
    return {
        type: name__DELETE_STACK,
        payload: payload
    }
};
export type type__DELETE_STACK = ReturnType<typeof return__DELETE_STACK>;



export const name__GET_LIST_STACK = 'stack/GET_LIST_STACK'; 
export const return__GET_LIST_STACK = (payload: any) => {
    return {
        type: name__GET_LIST_STACK,
        payload: payload
    }
};
export type type__GET_LIST_STACK = ReturnType<typeof return__GET_LIST_STACK>;

export const name__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS = 'stack/ADD_WHOLE_PORTALS_TO_LOCAL_STACKS'; 
export const return__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS = () => {
    return {
        type: name__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS,
    }
};
export type type__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS = ReturnType<typeof return__ADD_WHOLE_PORTALS_TO_LOCAL_STACKS>;


export const name__VISIT_STACK: string = `stack/VISIT_STACK`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__VISIT_STACK {
    id: string;
    stringSearching: string,
}
export const return__VISIT_STACK = (payload: Payload__VISIT_STACK) => {
    return {
        type: name__VISIT_STACK,
        payload: payload
    }
};
export type type__VISIT_STACK = ReturnType<typeof return__VISIT_STACK>;  // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!

