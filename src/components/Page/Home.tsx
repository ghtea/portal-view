import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';
import * as actionsPortal from 'store/actions/portal';

import Portal from './Home/Portal';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const idUser:string = useSelector((state: StateRoot) => state['auth']['user']['id']);

    const readyListPortal:any = useSelector((state: StateRoot) => state['status']['ready']['listPortal']);
    const loadingListPortal:any = useSelector((state: StateRoot) => state['status']['loading']['listPortal']);
    const listPortal:any = useSelector((state: StateRoot) => state['portal']['listPortal']);

    useEffect(()=>{
        
        dispatch(actionsPortal.return__GET_LIST_PORTAL({
            idUser: 'idUser'
        }))
        
    },[readyUser, idUser]);
  
  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >

            <div className={`${styles['filters']}`} >
                <div>  importance  </div>
                <div>  hp  </div>
                <div>  tags  </div>
            </div>

            {loadingListPortal && !readyListPortal && <div>loading</div>}

            {readyListPortal && 
                <div className={`${styles['container']}`} >
                    {listPortal.map( (portal:any, index:number)=>(
                        <Portal
                            key={`portal-${index}`}

                            _id={portal._id}
                            idUser={portal.idUser}
                        
                            kind={portal.kind}

                            name={portal.name}
                            initials={portal.initials}
                            url={portal.url}

                            tags={portal.tags}
                            hue={portal.hue}

                            lifespan={portal.lifespan}
                            listBooleanVisited={portal.listBooleanVisited}
                            dateVisitedLast={portal.dateVisitedLast}

                        
                        />
                    ))}
                </div>
            }


        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

