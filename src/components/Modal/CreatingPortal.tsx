import React, { useCallback, useEffect } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import {pascalToCamel} from 'tools/vanilla/convertName';
import IconX from 'svgs/basic/IconX';

import styles from './CreatingPortal.module.scss';
import stylesModalA from 'components/Modal/Template/ModalA.module.scss';


type PropsCreatingPortal = {};

function CreatingPortal({}: PropsCreatingPortal) {
  
  const dispatch = useDispatch();

  const onClick_HideModal = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', pascalToCamel('CreatingPortal')],
        replacement: false
      }))
    },[]
  );
  
  // ~ template
  
  /*
  const onClick_ChangeOptionTheme = useCallback(
    (replacement:string) => {
      dispatch(actionsStatus.return__REPLACE({
        listKey: ['current', 'theme', 'option'],
        replacement: replacement
      }) );
      Cookies.set('optionTheme', replacement, { expires: 14});
    }, []
  );
  */
  
  return (
    <div 
        className={`${stylesModalA['background-shadow']}`} 
        onClick={()=>onClick_HideModal()}
    >
        <div className={`${stylesModalA['modal']}`} >



        <div className={`${stylesModalA['header']}`} >
            <div>  <FormattedMessage id={`Modal.CreatingPortal_Title`} /> </div>
            <div
                onClick={()=>onClick_HideModal()}
            > 
                <IconX className={`${stylesModalA['icon-x']}`} />
            </div>
        </div>
    
      
      <div className={`${stylesModalA['content']}`} >
        
        <div className={`${styles['content__section']}`} >
          <div> <FormattedMessage id={`Modal.CreatingPortal_Name`} /> </div>
          <div>
            
          </div>
        </div>
        
        <div className={`${styles['content__section']}`} >
          <div>  <FormattedMessage id={`Modal.CreatingPortal_Url`} /></div>
          <div>
            
          </div>
        </div>

        <div className={`${styles['content__section']}`} >
          <div>  <FormattedMessage id={`Modal.CreatingPortal_Tags`} /></div>
          <div>
            
          </div>
        </div>
        
      </div>
        

        </div>   
    </div>
  );
}

CreatingPortal.defaultProps = {};

export default CreatingPortal;


