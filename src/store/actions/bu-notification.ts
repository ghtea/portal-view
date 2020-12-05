
export enum MsTimeBanner {
  normal = 3000,
  short = 2000,
  long = 5000,
  lasting = 10000
}

export const name__REPLACE: string = `notification/REPLACE`;    // 뒤에 as const 를 붙이면 reducer 에서 status.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

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

export type type__REPLACE = ReturnType<typeof return__REPLACE>;




export const name__ADD_BANNER: string = `notification/ADD_BANNER`;    // 뒤에 as const 를 붙이면 reducer 에서 notification.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

interface Payload__ADD_BANNER {
    code: string;
    id?: string;
}

export const return__ADD_BANNER = (payload: Payload__ADD_BANNER) => {    
    return {
        type: name__ADD_BANNER,
        payload: payload
    }
};

export type type__ADD_BANNER = ReturnType<typeof return__ADD_BANNER>;



export const name__DELETE_BANNER: string = `notification/DELETE_BANNER`;    // 뒤에 as const 를 붙이면 reducer 에서 notification.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

interface Payload__DELETE_BANNER {
    id: string;
}

export const return__DELETE_BANNER = (payload: Payload__DELETE_BANNER) => {    
    return {
        type: name__DELETE_BANNER,
        payload: payload
    }
};

export type type__DELETE_BANNER = ReturnType<typeof return__DELETE_BANNER>;





export const name__ADD_DELETE_BANNER: string = `notification/ADD_DELETE_BANNER`;    // 뒤에 as const 를 붙이면 reducer 에서 notification.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

interface Payload__ADD_DELETE_BANNER {
    code: string;
}

export const return__ADD_DELETE_BANNER = (payload: Payload__ADD_DELETE_BANNER) => {    
    return {
        type: name__ADD_DELETE_BANNER,
        payload: payload
    }
};

export type type__ADD_DELETE_BANNER = ReturnType<typeof return__ADD_DELETE_BANNER>;


/*
type typeAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
  */
// typescript 안의 type 과 redux 의 type 구분 주의!




/*
    Notification
        {
            id: 'ddd',
            situation: '',
            message: 'ddd',
            created: 2020. ...
        }
*/