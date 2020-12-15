import React, { useCallback, useEffect, useState } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconX from 'svgs/basic/IconX';

import styles from './CreatingPortal.module.scss';
import stylesModalA from 'components/Modal/Template/ModalA.module.scss';


type PropsCreatingPortal = {};

function CreatingPortal({}: PropsCreatingPortal) {
  
    const dispatch = useDispatch();
    const intl = useIntl();


    const onClick_HideModal = useCallback(
        () => {
        dispatch(actionsStatus.return__REPLACE({ 
            listKey: ['showing', 'modal', pascalToCamel('CreatingPortal')],
            replacement: false
        }))
        },[]
    );

    const [kind, setKind] = useState("normal")
    const inputName = useInput(""); // {value, setValue, onChange};
    const inputUrl = useInput(""); // {value, setValue, onChange};
    const inputTags = useInput(""); // {value, setValue, onChange};


    const onClick_CreatePortal = useCallback(
        () => {
        
            dispatch(actionsPortal.return__CREATE_PORTAL({
                kind: kind,
                name: inputName.value,
                url: inputUrl.value,
                tags: inputTags.value,
            }));
        
        },
        [inputName, inputUrl, inputTags]
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
    <>
    <div 
        className={`${stylesModalA['background-shadow']}`} 
        onClick={()=>onClick_HideModal()}
    />
    
        <div className={`${styles['modal']} ${stylesModalA['modal']}`} >



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
          <div className={`${styles['input-name']}`} >
                <input 
                    type='text'
                    placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Name'})}
                    value={inputName.value}
                    onChange={inputName.onChange} 
                /> 
          </div>
        </div>
        
        <div className={`${styles['content__section']}`} >
          <div>  <FormattedMessage id={`Modal.CreatingPortal_Url`} /></div>
          <div className={`${styles['input-url']}`} >
                <input 
                    type='text'
                    placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Url'})}
                    value={inputUrl.value}
                    onChange={inputUrl.onChange} 
                /> 
          </div>
        </div>

        <div className={`${styles['content__section']}`} >
          <div>  <FormattedMessage id={`Modal.CreatingPortal_Tags`} /></div>
          <div className={`${styles['input-tags']}`} >
                <input 
                    type='text'
                    placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Tags'})}
                    value={inputTags.value}
                    onChange={inputTags.onChange} 
                /> 
          </div>
        </div>
        

        <div className={`${styles['content__section']}`} >
            <button
                className={`${stylesModalA['button-main']}`}
                onClick={()=>onClick_CreatePortal()}
            > <FormattedMessage id={`Modal.CreatingPortal_Create`} /> </button>
        </div>


      </div>
        

    </div>
    </>
  );
}

CreatingPortal.defaultProps = {};

export default CreatingPortal;


