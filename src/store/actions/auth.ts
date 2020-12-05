//const department: string = 'auth';


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



export const name__LOG_CHECK = 'auth/LOG_CHECKP';

export const return__LOG_CHECK = () => {
    return {
        type: name__LOG_CHECK
    }
};

export type type__LOG_CHECK = ReturnType<typeof return__LOG_CHECK>;
