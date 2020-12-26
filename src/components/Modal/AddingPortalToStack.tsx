import React, { useCallback, useEffect, useState, useMemo } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsStack from 'store/actions/stack';

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconX from 'svgs/basic/IconX';

import styles from './AddingPortalToStack.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsAddingPortalToStack = {};

function AddingPortalToStack({}: PropsAddingPortalToStack) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id );
    const idPortal = useSelector((state: StateRoot) => state.status.current.portal.addingToStack );

    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('AddingPortalToStack')],
                replacement: false
            }));
        },[]
    );

    const [kind, setKind] = useState<'new' | 'existing'>('existing');  // create, update   
    const [nameNew, setNameNew] = useState('');
    const [idStack, setIdStack] = useState('');

    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const {value, name} = event.currentTarget;
            if (name==='kind'){
                setKind(value as ('existing' | 'new'));
            }
            else if (name === 'nameNew'){
                setNameNew(value);
            }
        },[]
    ); 

    // const [tagCurrent, setTagCurrent] = useState("");

    const onChange_InputSearch = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const stringSearching = event.currentTarget.value;
            
            console.log(stringSearching);
        },[]
    ); 
    
    
    // add to stack
    const onSubmit = useCallback(
        (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            dispatch(actionsStack.return__ADD_PORTAL_TO_STACK({
                kind: kind,
                idPortal: idPortal,
                nameStack: nameNew,
                idStack: idStack
            }));

        }, [kind, idPortal, nameNew, idStack]
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
                <div>  <FormattedMessage id={`Modal.AddingPortalToStack_Title`} /> </div>
                <div
                    onClick={()=>onClick_HideModal()}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </div>
            </div>
        
            <form 
                className={`${stylesModal['content']}`} 
                onSubmit={onSubmit}
            >   

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.AddingPortalToStack_WhichStack`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="kind" value="create" 
                            id="kind----create"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----create"> <FormattedMessage id={`Modal.AddingPortalToStack_NewStack`} /> </label>

                        <input type="radio" name="kind" value="update" defaultChecked
                            id="kind----update"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----update"> <FormattedMessage id={`Modal.AddingPortalToStack_ExistingStack`} /></label>
                    </div>
                </div>

                { (kind === 'new') &&
                    <div className={`${stylesModal['content__section']}`} >
                        <div> <FormattedMessage id={'Modal.AddingPortalToStack_NameOfStack'} /> </div>
                        <div className={`${styles['container__input-name']}`} >
                            <input 
                                type='text'
                                placeholder={intl.formatMessage({ id: 'Modal.AddingPortalToStack_NameOfStack'})}
                                name='nameNew'
                                value={nameNew}
                                onChange={onChange_InputNormal} 
                            /> 
                        </div>
                    </div>
                }

                { (kind==='existing') && 
                    <div className={`${stylesModal['content__section']}`} >
                        <div> <FormattedMessage id={`Modal.AddingPortalToStack_Choose`} /> </div>
                        {[{}, {}].map((stack, index)=>{
                            return (
                                <input
                                    key={`stack-${index}`}
                                    type='radio'
                                    name='idExistingPortal'
                                    value={nameNew}
                                    onChange={onChange_InputNormal} 
                                >

                                </input>
                            )
                        })}
                    </div>
                }

                <div className={`${stylesModal['content__section']}`} >
                    <input
                        type="submit"
                        value={intl.formatMessage({ id: 'Modal.AddingPortalToStack_Add'})}
                    />
                </div>


            </form>
        </div>

    </div>
  );
}

AddingPortalToStack.defaultProps = {};

export default AddingPortalToStack;


