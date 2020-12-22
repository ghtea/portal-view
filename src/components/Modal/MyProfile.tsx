import React, { useCallback, useEffect, useState, useMemo } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsProfile from 'store/actions/portal';

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconX from 'svgs/basic/IconX';

import styles from './MyProfile.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsMyProfile = {};

function MyProfile({}: PropsMyProfile) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const user = useSelector((state: StateRoot) => state['auth']['user']);

    const [attachment, setAttachment] = useState("");
    const [displayNameEditing, setTisplayNameEditing] = useState("");

    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('MyProfile')],
                replacement: false
            }));
        },[]
    );

    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {

            if (event.currentTarget.name === 'displayNameEditing'){
                // event.currentTarget.value
            }
            
        },[]
    ); 

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            console.log('do update user info');
        }
    };
    /*
    const onClick_EditProfile = useCallback(
        (draft) => {
            dispatch(actionsProfile.return__EDIT_PORTAL({
                ...draft,
                id: idProfileEditing
            }));
        }, []
    );
  */
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
                <div>  <FormattedMessage id={`Modal.MyProfile_Title`} /> </div>
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
                    <div>  <FormattedMessage id={`Modal.MyProfile_EmailAddress`} /></div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.MyProfile_Name`} /></div>
                    <div> {user.displayName} </div>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.MyProfile_Photo`} /> </div>

                    <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}

                    <div className={`${stylesCreatingProfile['container__input-name']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingProfile_Name'})}
                            name='name'
                            value={draft.name}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingProfile_Initials`} /> </div>
                    <div className={`${stylesCreatingProfile['container__input-initials']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingProfile_Initials'})}
                            name='initials'
                            value={draft.initials}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>
                
                <input type="submit" value="Nweet" />

                <div className={`${stylesModal['content__section']}`} >
                    <input
                        type="submit"
                        className={`${stylesModal['submit']}`}
                    > <FormattedMessage id={`Modal.MyProfile_Update`} /> </input>
                </div>

            </form>
        </div>

    </div>
  );
}

MyProfile.defaultProps = {};

export default MyProfile;


