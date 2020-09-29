import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface GameReducerType {
  boostAllowance: number;

  redTotalSupply: number;
  blueTotalSupply: number;
}

export const defaultState: GameReducerType = {
  boostAllowance: 0,

  redTotalSupply: 0,
  blueTotalSupply: 0,
};

// reducers

const gameBoostApproveSuccessReducer = (
  state: GameReducerType,
  { payload }: Action<number>,
): GameReducerType => ({
  ...state,
  boostAllowance: payload,
});

const gameLoadRedTotalSupplyReducer = (
  state: GameReducerType,
  { payload }: Action<number>,
): GameReducerType => ({
  ...state,
  redTotalSupply: payload,
});

const gameLoadBlueTotalSupplyReducer = (
  state: GameReducerType,
  { payload }: Action<number>,
): GameReducerType => ({
  ...state,
  blueTotalSupply: payload,
})

export const gameReducer = createReducer<GameReducerType>(defaultState, {
  [ActionType.GAME_BOOST_APPROVE_SUCCESS]: gameBoostApproveSuccessReducer,
  [ActionType.GAME_LOAD_RED_TOTAL_SUPPLY_SUCCESS]: gameLoadRedTotalSupplyReducer,
  [ActionType.GAME_LOAD_BLUE_TOTAL_SUPPLY_SUCCESS]: gameLoadBlueTotalSupplyReducer,
});
