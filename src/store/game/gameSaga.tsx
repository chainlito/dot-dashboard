import { put, takeLatest, fork, select } from 'redux-saga/effects';
import { ActionType } from 'types';

import { web3client } from 'lib';
import { selectAccount } from 'store/account/accountSelector';
import Config from 'config';
import { gameBoostApproveSuccess } from './gameActions';

function* boostLoadAllowance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const allowance = yield web3client.allowance(web3client.wethTokenContract, account.address, Config.Orchestrator.address);
    yield put(gameBoostApproveSuccess(allowance));
  } catch(err) {
    yield put(gameBoostApproveSuccess(0));
  }
}

function* boostApprove() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.approve(web3client.wethTokenContract, Config.Orchestrator.address, account.address);
    const allowance = yield web3client.allowance(web3client.wethTokenContract, account.address, Config.Orchestrator.address);
    yield put(gameBoostApproveSuccess(allowance));
  } catch(err) {
    yield put(gameBoostApproveSuccess(0));
  }
}

function* sagaWatcher() {
  yield takeLatest(ActionType.GAME_BOOST_LOAD_ALLOWANCE as any, boostLoadAllowance);
  yield takeLatest(ActionType.GAME_BOOST_APPROVE as any, boostApprove);
}

export default [
  fork(sagaWatcher),
];
