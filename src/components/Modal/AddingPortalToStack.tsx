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
import IconCheck from 'svgs/basic/IconCheck';


import styles from './AddingPortalToStack.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsAddingPortalToStack = {};

function AddingPortalToStack({}: PropsAddingPortalToStack) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id );
    const idPortal = useSelector((state: StateRoot) => state.status.current.portal.addingToStack );
    const listStackRaw = useSelector((state: StateRoot) => state.stack.listStack );

    const listStackOrdered = useMemo(()=>{
        console.log(listStackRaw)
        return listStackRaw.sort() // a, b, c, ...
    }, [listStackRaw])

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
    const [listIdStack, setListIdStack] = useState<string[]>([]);

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
    
    const onChange_InputCheckbox = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const idStackClicked = event.currentTarget.value;
            let replacement = listIdStack;
            if (listIdStack.includes(idStackClicked)){
                replacement = listIdStack.filter(idStackEach => idStackEach !== idStackClicked);
            }
            else {
                replacement.push(idStackClicked)
            }
            setListIdStack(replacement);
        },[listIdStack]
    ); 
    
    // add to stack
    const onSubmit = useCallback(
        (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            dispatch(actionsStack.return__ADD_PORTAL_TO_STACK({
                kind: kind,
                idPortal: idPortal,
                nameStack: nameNew,
                listIdStack: listIdStack
            }));

        }, [kind, idPortal, nameNew, listIdStack]
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
                        <input type="radio" name="kind" value="new" 
                            id="kind----new"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----new"> <FormattedMessage id={`Modal.AddingPortalToStack_NewStack`} /> </label>

                        <input type="radio" name="kind" value="existing" defaultChecked
                            id="kind----existing"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----existing"> <FormattedMessage id={`Modal.AddingPortalToStack_ExistingStack`} /></label>
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
                        <ul className={`${styles['collection-checkbox']}`} >
                        {listStackOrdered.map(( stack, index)=>{
                            console.log(stack?.id)

                            return (
                                <li
                                    key={`stack-${index}`}
                                    className={'container__input-checkbox'}
                                >   
                                    <input 
                                        type="checkbox" 
                                        id={`checkbox-${stack?.id}`}
                                        name="idStack"
                                        value={stack?.id}
                                        defaultChecked={ listIdStack.includes(stack?.id as string) }
                                        onChange={onChange_InputCheckbox} 
                                    /> 
                                    <label htmlFor={`checkbox-${stack?.id}`}>  
                                        <div> <IconCheck className={`${styles['icon-check']}`} kind='solid' /> </div>
                                        <div> {stack?.name} </div> 
                                    </label>
                                </li> 
                            )
                        })}
                        </ul>
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


