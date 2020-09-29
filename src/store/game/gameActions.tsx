import { ActionType } from "types";

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
