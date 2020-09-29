import { RootState } from 'types';
import { GameReducerType } from './gameReducer';
import { createSelector } from 'reselect';

export const selectGameState = (state: RootState, props?: any): GameReducerType => {
  return state.game;
};

export const selectGameBoostAllowed = createSelector(
  [ selectGameState ],
  (state) => state.boostAllowance > 0,
);

export const selectGameRedTotalSupply = createSelector(
  [ selectGameState ],
  (state) => state.redTotalSupply,
);

export const selectGameBlueTotalSupply = createSelector(
  [ selectGameState ],
  (state) => state.blueTotalSupply,
);
