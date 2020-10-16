import { all, put } from "redux-saga/effects";
import { ActionType } from 'types';
import basic from 'store/app/basicSaga';
import account from 'store/account/accountSaga';
import pool from 'store/pool/poolSaga';
import game from 'store/game/gameSaga';

export default function* rootSaga() {
    yield all([
        ...basic,
        ...account,
        ...pool,
        ...game,
    ]);
    yield put({
        type: ActionType.INIT_STORE
    });
}
