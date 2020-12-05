import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import * as convertName from 'tools/vanilla/convertName';

import styles from './SoloDestination.module.scss';

//import IconHome from 'svgs/basic/IconHome';
//import IconSignIn from 'svgs/basic/IconSignIn';
//import IconGlobe from 'svgs/basic/IconGlobe';


type PropsSoloDestination = {
  idSolo: string
  
};

function SoloDestination({idSolo}: PropsSoloDestination) {
  
  let history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
  const onClick_LinkInsideApp = useCallback(
    ( destination:string) => {
      history.push(destination);
    },[history]
  );
  
  return (

	<div className={`${styles['root']}`} >
        <div> 
            <a
                onClick={()=>onClick_LinkInsideApp(`/${ convertName.pascalToSnake(idSolo)}`)}
            > 
                {t(`Nav.${idSolo}`)} 
            </a> 
        </div>
    </div>
  
  );
}

SoloDestination.defaultProps = {};

export default SoloDestination;



// <Div_Triangle lengthBasic={12} onClick = {(event)=>onClick_NavGroupItemTitle(event, 'Color') } />