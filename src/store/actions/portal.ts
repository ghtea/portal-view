

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



export const name__CREATE_PORTAL = 'portal/CREATE_PORTAL';
export const return__CREATE_PORTAL = (payload: any) => {
    return {
        type: name__CREATE_PORTAL,
        payload: payload
    }
};
export type type__CREATE_PORTAL = ReturnType<typeof return__CREATE_PORTAL>;

export const name__EDIT_PORTAL = 'portal/EDIT_PORTAL';
export const return__EDIT_PORTAL = (payload: any) => {
    return {
        type: name__EDIT_PORTAL,
        payload: payload
    }
};
export type type__EDIT_PORTAL = ReturnType<typeof return__EDIT_PORTAL>;

export const name__DELETE_PORTAL = 'portal/DELETE_PORTAL';
interface Payload__DELETE_PORTAL {
    id: string;
    idUser: string;
}
export const return__DELETE_PORTAL = (payload: Payload__DELETE_PORTAL) => {
    return {
        type: name__DELETE_PORTAL,
        payload: payload
    }
};
export type type__DELETE_PORTAL = ReturnType<typeof return__DELETE_PORTAL>;



export const name__GET_LIST_PORTAL = 'portal/GET_LIST_PORTAL';

export const return__GET_LIST_PORTAL = (payload: any) => {
    return {
        type: name__GET_LIST_PORTAL,
        payload: payload
    }
};

export type type__GET_LIST_PORTAL = ReturnType<typeof return__GET_LIST_PORTAL>;



export const name__VISIT_PORTAL: string = `portal/VISIT_PORTAL`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

export const return__VISIT_PORTAL = (payload: any) => {
    return {
        type: name__VISIT_PORTAL,
        payload: payload
    }
};

export type type__VISIT_PORTAL = ReturnType<typeof return__VISIT_PORTAL>;  // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!

