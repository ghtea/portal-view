import React, { useCallback, useEffect, useState, useMemo } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsProfile from 'store/actions/portal';
import * as actionsAuth from 'store/actions/auth';

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

    const [urlPhotoLocal, setUrlPhotoLocal] = useState("");
    const [displayNameEditing, setTisplayNameEditing] = useState(user?.displayName);

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
    
    const onChange_InputFile = useCallback( (event:React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: { files } } = event;
        const theFile = files && files[0];
        if (theFile){
            const reader = new FileReader();

            reader.onloadend = (finishedEvent) => {
                const result = finishedEvent?.target?.result || undefined;
                //const { currentTarget: { result }} = finishedEvent;
                setUrlPhotoLocal(result as string);
            };
            reader.readAsDataURL(theFile);  // then onloadend is triggered
        }
    },[]);
    const onClick_InputFile = useCallback( (event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.currentTarget.value = '';
    },[]);
    const onClick_ClearInputFile = useCallback( (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUrlPhotoLocal('');
    },[]);

    
    const onSubmit = useCallback( (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(actionsAuth.return__UPDATE_PROFILE({
            urlPhotoLocal: urlPhotoLocal,
            displayName: displayNameEditing
        }));
        
    },[urlPhotoLocal, displayNameEditing]);

    const onClick_LogOut = useCallback(
        () => {
            dispatch(actionsAuth.return__LOG_OUT());
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
                {urlPhotoLocal && (
                    <img  className={`${styles['photo-profile']}`} src={urlPhotoLocal} />
                )}
                
                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.MyProfile_EmailAddress`} /></div>
                    <p className={`${styles['email']}`}> {user?.email} </p>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.MyProfile_Name`} /></div>
                    <p className={`${styles['displayName']}`}> {user?.displayName} </p>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.MyProfile_Photo`} /> </div>

                    <div className={`container__input-file`} > 
                        <input type="file" accept="image/*" id='file-photo' 
                            onChange={onChange_InputFile} 
                            onClick={onClick_InputFile}
                        />
                        <label htmlFor='file-photo' > Upload Photo </label>
                        { urlPhotoLocal && <button onClick={onClick_ClearInputFile}> Clear </button> }
                    </div> 
                </div>
                
                {(urlPhotoLocal || displayNameEditing !== user?.displayName) &&
                    <div className={`${stylesModal['content__section']}`} >
                        <input
                            type="submit"
                            value={intl.formatMessage({ id: 'Modal.MyProfile_Update'})}
                        />
                    </div>
                }

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${styles['button-log-out']}`}
                        onClick={()=>onClick_LogOut()}
                    > <FormattedMessage id={`Modal.Setting_LogOut`} /> </button>
                </div>

            </form>

            

        </div>

    </div>
  );
}

MyProfile.defaultProps = {};

export default MyProfile;




/*
{attachment && (
    <div>
        <img src={attachment} width="50px" height="50px" />
        <button onClick={onClick_ClearAttachment}>Clear</button>
    </div>
)}

*/