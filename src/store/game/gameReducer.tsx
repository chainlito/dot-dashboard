import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface GameReducerType {
  boostAllowance: number;
}

export const defaultState: GameReducerType = {
  boostAllowance: 0,
};

// reducers

const gameBoostApproveSuccessReducer = (
  state: GameReducerType,
  { payload }: Action<number>,
): GameReducerType => ({
  ...state,
  boostAllowance: payload,
});

export const gameReducer = createReducer<GameReducerType>(defaultState, {
  [ActionType.GAME_BOOST_APPROVE_SUCCESS]: gameBoostApproveSuccessReducer,
});
