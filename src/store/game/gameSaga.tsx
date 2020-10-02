import { put, takeLatest, fork, select } from 'redux-saga/effects';
import { ActionType, RebaseHistory } from 'types';

import { web3client, ethscanclient } from 'lib';
import { selectAccount } from 'store/account/accountSelector';
import Config from 'config';
import { gameBoostApproveSuccess, gameLoadRedTotalSupplySuccess, gameLoadBlueTotalSupplySuccess, gameLoadHistorySuccess } from './gameActions';

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

function* boostUp() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.boostUp(account.address);
  } catch(err) {
    console.error(err);
  }
}

function* boostDown() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.boostDown(account.address);
  } catch(err) {
    console.error(err);
  }
}

function* loadTotalSupply() {
  try {
    const redSupply = yield web3client.getTotalSupply(web3client.redTokenContract);
    const blueSupply = yield web3client.getTotalSupply(web3client.blueTokenContract);
    yield put(gameLoadRedTotalSupplySuccess(redSupply));
    yield put(gameLoadBlueTotalSupplySuccess(blueSupply));
  } catch(err) {
    console.error(err);
  }
}

function* loadRebaseHistory() {
  try {
    const txlist: Array<any> = yield ethscanclient.getTransactionsList(Config.Orchestrator.address);
    const history: Array<RebaseHistory> = [];
    let count = 0;
    for(let i = 0; i < txlist.length; i ++) {
      if (txlist[i].input === Config.Orchestrator.methods.boostDown || txlist[i].input === Config.Orchestrator.methods.boostUp) {
        count ++;
      } else if (txlist[i].input === Config.Orchestrator.methods.rebase) {
        const _redSupply = yield ethscanclient.getTotalSupply(Config.RedToken.address, parseInt(txlist[i].blockNumber));
        const _blueSupply = yield ethscanclient.getTotalSupply(Config.BlueToken.address, parseInt(txlist[i].blockNumber));
        history.push({
          timestamp: txlist[i].timeStamp,
          percent: 0,
          boostCount: count,
          redSupply: _redSupply,
          blueSupply: _blueSupply,
        });
        count = 0;
      }
    }
    yield put(gameLoadHistorySuccess(history));
  } catch(err) {
    console.error(err);
  }
}

function* sagaWatcher() {
  yield takeLatest(ActionType.GAME_BOOST_LOAD_ALLOWANCE as any, boostLoadAllowance);
  yield takeLatest(ActionType.GAME_BOOST_APPROVE as any, boostApprove);
  yield takeLatest(ActionType.GAME_BOOST_UP as any, boostUp);
  yield takeLatest(ActionType.GAME_BOOST_DOWN as any, boostDown);
  yield takeLatest(ActionType.GAME_LOAD_TOTAL_SUPPLY as any, loadTotalSupply);
  yield takeLatest(ActionType.INIT_STORE as any, loadTotalSupply);
  yield takeLatest(ActionType.INIT_STORE as any, loadRebaseHistory);
}

export default [
  fork(sagaWatcher),
];
