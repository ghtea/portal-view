//const department: string = 'auth';

// ap-northeast-2_FwCEb6QCh
//  24ealdh09hfu5npai98cf4eqo2

export const name__REPLACE: string = `auth/REPLACE`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
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


export const name__REPLACE_USER: string = `auth/REPLACE_USER`;    // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__REPLACE_USER {
    user: any
}
export const return__REPLACE_USER = (payload?: Payload__REPLACE_USER) => {
    return {
        type: name__REPLACE_USER,
        payload: payload
    }
};
export type type__REPLACE_USER = ReturnType<typeof return__REPLACE_USER>;  // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!


/*
type typeAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
  */
// typescript 안의 type 과 redux 의 type 구분 주의!




export const name__LOG_IN = 'auth/LOG_IN';
interface Payload__LOG_IN {
    email: string;
    password: string;
}
export const return__LOG_IN = (payload: Payload__LOG_IN) => {
    return {
        type: name__LOG_IN,
        payload: payload
    }
};
export type type__LOG_IN = ReturnType<typeof return__LOG_IN>;


export const name__LOG_IN_GOOGLE = 'auth/LOG_IN_GOOGLE';
export const return__LOG_IN_GOOGLE = () => {
    return {
        type: name__LOG_IN_GOOGLE
    }
};
export type type__LOG_IN_GOOGLE = ReturnType<typeof return__LOG_IN_GOOGLE>;

export const name__LOG_IN_GITHUB = 'auth/LOG_IN_GITHUB';
export const return__LOG_IN_GITHUB = () => {
    return {
        type: name__LOG_IN_GITHUB
    }
};
export type type__LOG_IN_GITHUB = ReturnType<typeof return__LOG_IN_GITHUB>;



export const name__LOG_OUT = 'auth/LOG_OUT';
export const return__LOG_OUT = () => {
    return {
        type: name__LOG_OUT
    }
};
export type type__LOG_OUT = ReturnType<typeof return__LOG_OUT>;





export const name__SIGN_UP = 'auth/SIGN_UP';
interface Payload__SIGN_UP {
    email: string;
    password1: string;
    password2: string;
}
export const return__SIGN_UP = (payload: Payload__SIGN_UP) => {
    return {
        type: name__SIGN_UP,
        payload: payload
    }
};
export type type__SIGN_UP = ReturnType<typeof return__SIGN_UP>;



export const name__LOG_CHECK_SUCCEEDED = 'auth/LOG_CHECK_SUCCEEDED';
export const return__LOG_CHECK_SUCCEEDED = () => {
    return {
        type: name__LOG_CHECK_SUCCEEDED
    }
};
export type type__LOG_CHECK_SUCCEEDED = ReturnType<typeof return__LOG_CHECK_SUCCEEDED>;


export const name__LOG_CHECK_FAILED = 'auth/LOG_CHECK_FAILED';
export const return__LOG_CHECK_FAILED = () => {
    return {
        type: name__LOG_CHECK_FAILED
    }
};
export type type__LOG_CHECK_FAILED = ReturnType<typeof return__LOG_CHECK_FAILED>;



export const name__UPDATE_PROFILE = 'auth/UPDATE_PROFILE ';
interface Payload__UPDATE_PROFILE  {
    displayName?: string;
    urlPhotoLocal?: string;
}
export const return__UPDATE_PROFILE  = (payload: Payload__UPDATE_PROFILE ) => {
    return {
        type: name__UPDATE_PROFILE ,
        payload: payload
    }
};
export type type__UPDATE_PROFILE  = ReturnType<typeof return__UPDATE_PROFILE >;

