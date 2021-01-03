//const department: string = 'status';


export const name__REPLACE: string = `status/REPLACE`;    
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

/*
type typeAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
  */
// typescript 안의 type 과 redux 의 type 구분 주의!


export const name__DETECT_LANGUAGE: string = `status/DETECT_LANGUAGE`;    // 뒤에 as const 를 붙이면 reducer 에서 status.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

export const return__DETECT_LANGUAGE = () => {    
    return {
        type: name__DETECT_LANGUAGE
    }
};

export type type__DETECT_LANGUAGE = ReturnType<typeof return__DETECT_LANGUAGE>;




export const name__READ_OPTION_THEME: string = `status/READ_OPTION_THEME`;    // 뒤에 as const 를 붙이면 reducer 에서 status.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

export const return__READ_OPTION_THEME = () => {    
    return {
        type: name__READ_OPTION_THEME
    }
};

export type type__READ_OPTION_THEME = ReturnType<typeof return__READ_OPTION_THEME>;



export const name__DECIDE_THEME: string = `status/DECIDE_THEME`;    

export const return__DECIDE_THEME = () => {    
    return {
        type: name__DECIDE_THEME
    }
};

export type type__DECIDE_THEME = ReturnType<typeof return__DECIDE_THEME>;


