import React, { useCallback, useEffect, useState, useMemo } from "react";

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

import styles from './CreatingStack.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsCreatingStack = {};

function CreatingStack({}: PropsCreatingStack) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id );


    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('CreatingStack')],
                replacement: false
            }));
        },[]
    );

    const [draft,setDraft] = useState({
        // idUser 는 saga에서!
        
        kind: "manual",
        name: "",
        lifespan: "15",  // input.value is (maybe) always string!

        listTag: [] as string[],
        listIdPortal: [] as string[]
    })

    // const [tagCurrent, setTagCurrent] = useState("");

    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const draftReplacement = {
                ...draft, 
                [event.currentTarget.name]: event.currentTarget.value
            }
            setDraft(draftReplacement);
            console.log(draftReplacement);
        },[draft]
    ); 

    const onClick_CreatePortal = useCallback(
        (draft) => {
            dispatch(actionsPortal.return__CREATE_PORTAL({
                ...draft
            }));
        }, []
    );
  
  return (
    <div className={`${styles['root']} ${stylesModal['root']}`} >

        <div 
            className={`${stylesModal['outside']}`} 
            onClick={()=>onClick_HideModal()}
        />

        <div 
            className={`${stylesModal['modal']}`} 
        >
            <div className={`${stylesModal['header']}`} >
                <div>  <FormattedMessage id={`Modal.CreatingStack_Title`} /> </div>
                <div
                    onClick={()=>onClick_HideModal()}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </div>
            </div>
        
            <div className={`${stylesModal['content']}`} >
                

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingStack_Kind`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="kind" value="normal" defaultChecked
                            id="kind----normal"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----normal">manual</label>
                        {/*
                        <input type="radio" name="kind" value="search"
                            id="kind----search"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----search">tag</label>
                        */}
                    </div>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingStack_Name`} /> </div>
                    <div className={`${styles['container__input-name']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingStack_Name'})}
                            name='name'
                            value={draft.name}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${stylesModal['button-main']}`}
                        onClick={()=>onClick_CreatePortal(draft)}
                    > <FormattedMessage id={`Modal.CreatingStack_Create`} /> </button>
                </div>


            </div>
        </div>

    </div>
  );
}

CreatingStack.defaultProps = {};

export default CreatingStack;


