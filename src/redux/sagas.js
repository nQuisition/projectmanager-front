import { all, fork } from "redux-saga/effects";

import userSaga from "./user/userSaga";
import controlSaga from "./control/controlSaga";
import projectsSaga from "./projects/projectsSaga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(controlSaga), fork(projectsSaga)]);
}
