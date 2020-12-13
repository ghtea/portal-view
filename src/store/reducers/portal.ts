import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actionsPortal from 'store/actions/portal';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'


// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial;



const stateInitial = {
  
  listPortal: []
  
};



const reducerPortal = handleActions<State, any>({
  
  [actionsPortal.name__REPLACE]: (statePrevious, action: actionsPortal.type__REPLACE) => {
    
    return produce(statePrevious, stateNew => {
      if (action.payload === undefined) { 
        return;
      }
      else {
        const listKey: (string | number)[] = action.payload.listKey;
        
        try { putValueToNestedObject(stateNew, listKey, action.payload.replacement); 
          
        }
        catch {
          return;
        }
        
      }
      
    });
  }
  
}, stateInitial);

export default reducerPortal;
