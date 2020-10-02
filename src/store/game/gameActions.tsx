import { ActionType, RebaseHistory } from "types";

export const gameBoostLoadAllowance = () => ({
  type: ActionType.GAME_BOOST_LOAD_ALLOWANCE,
});

export const gameBoostApprove = () => ({
  type: ActionType.GAME_BOOST_APPROVE
});

export const gameBoostApproveSuccess = (payload: number) => ({
  type: ActionType.GAME_BOOST_APPROVE_SUCCESS,
  payload,
});

export const gameBoostUp = () => ({
  type: ActionType.GAME_BOOST_UP
});

export const gameBoostDown = () => ({
  type: ActionType.GAME_BOOST_DOWN
});

export const gameLoadTotalSupply = () => ({
  type: ActionType.GAME_LOAD_TOTAL_SUPPLY,
});

export const gameLoadRedTotalSupplySuccess = (payload: number) => ({
  type: ActionType.GAME_LOAD_RED_TOTAL_SUPPLY_SUCCESS,
  payload,
});

export const gameLoadBlueTotalSupplySuccess = (payload: number) => ({
  type: ActionType.GAME_LOAD_BLUE_TOTAL_SUPPLY_SUCCESS,
  payload,
});

export const gameLoadHistorySuccess = (payload: Array<RebaseHistory>) => ({
  type: ActionType.GAME_LOAD_REBASE_HISTORY_SUCCESS,
  payload,
})
