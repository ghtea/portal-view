import { all, fork } from 'redux-saga/effects'

import sagaStatus from './sagas/status';
import sagaNotification from './sagas/notification';
import sagaAuth from './sagas/auth';

export default function* sagaRoot() {
  yield all ([
    fork(sagaNotification),
    fork(sagaAuth),
    fork(sagaStatus)
  ])
  // code after fork-effect
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html