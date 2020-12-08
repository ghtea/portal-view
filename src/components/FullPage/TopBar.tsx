import React, { useCallback, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import IconLogo from 'svgs/others/IconLogo';

import styles from './TopBar.module.scss';


type PropsTopBar = {};

function TopBar({}: PropsTopBar) {
  
  const history = useHistory();
  
  // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
   
  const onClick_LinkInsideApp = useCallback(
    (destination:string) => {  history.push(destination);
    },[history]
  );
  
  return (
    <div className={`${styles['root']}`}
      onClick={(event)=>onClick_LinkInsideApp('/')}
    >
    
      <div>
          <IconLogo className={`${styles['icon-logo']}`} />
      </div>
      
      <div> 
        <a> 
            <FormattedMessage id={`Nav.NameApp`} />
        </a>
      </div>
        
    </div>
  );
}

TopBar.defaultProps = {};

export default TopBar;
