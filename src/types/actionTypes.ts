
export interface Action<T> {
    type: IActionType;
    payload: T;
}

export interface FormFieldPayload<T> {
    index?: number | string;
    key: T;
    value: string | any;
}

enum BasicType {
    INIT_STORE = 'ON_INIT',
    SET_NAVIGATION = 'SET_NAVIGATION',
    SET_LOADING = 'SET_LOADING',
}
enum AccountType {
    LOAD_ACCOUNT = 'LOAD_ACCOUNT',
    SET_ACCOUNT = 'SET_ACCOUNT',
}
enum TokenType {
    TOKEN_SET_TOTAL_SUPPLY = 'TOKEN_SET_TOTAL_SUPPLY',
    TOKEN_LOAD_TOTAL_SUPPLY = 'TOKEN_LOAD_TOTAL_SUPPLY',
    TOKEN_REBASE = 'TOKEN_REBASE',
}
enum PoolType {
    POOL_SET_CONTRACT = 'POOL_SET_CONTRACT',
    POOL_SET_STAKE_TOKEN_CONTRACT = 'POOL_SET_STAKE_TOKEN_CONTRACT',
    POOL_SET_POOL_INFO = 'POOL_SET_POOL_INFO',
    POOL_SET_STAKE_TOKEN_INFO = 'POOL_SET_STAKE_TOKEN_INFO',
    POOL_LOAD_ALLOWANCE = 'POOL_LOAD_ALLOWANCE',
    POOL_APPROVE_TOKEN = 'POOL_APPROVE_TOKEN',
    POOL_APPROVE_TOKEN_SUCCESS = 'POOL_APPROVE_TOKEN_SUCCESS',
    POOL_STAKE = 'POOL_STAKE',
    POOL_WITHDRAW = 'POOL_WITHDRAW',
    POOL_HARVEST = 'POOL_HARVEST',
    POOL_EXIT = 'POOL_EXIT',
    POOL_GET_EARNED = 'POOL_GET_EARNED',
    POOL_GET_EARNED_SUCCESS = 'POOL_GET_EARNED_SUCCESS',
    POOL_GET_STAKED = 'POOL_GET_STAKED',
    POOL_GET_STAKED_SUCCESS = 'POOL_GET_STAKED_SUCCESS',
    POOL_GET_STAKE_TOKEN_BALANCE = 'POOL_GET_STAKE_TOKEN_BALANCE',
    POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS = 'POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS',
    POOL_GET_TOTAL_STAKED_SUCCESS = 'POOL_GET_TOTAL_STAKED_SUCCESS',
    POOL_GET_PERIOD_FINISH = 'POOL_GET_PERIOD_FINISH',
    POOL_GET_PERIOD_FINISH_SUCCESS = 'POOL_GET_PERIOD_FINISH_SUCCESS',
}
enum UniType {
    UNI_LOAD_ALLOWANCE = 'UNI_LOAD_ALLOWANCE',
    UNI_APPROVE_TOKEN = 'UNI_APPROVE_TOKEN',
    UNI_APPROVE_TOKEN_SUCCESS = 'UNI_APPROVE_TOKEN_SUCCESS',
    UNI_STAKE = 'UNI_STAKE',
    UNI_WITHDRAW = 'UNI_WITHDRAW',
    UNI_HARVEST = 'UNI_HARVEST',
    UNI_EXIT = 'UNI_EXIT',
    UNI_GET_EARNED = 'UNI_GET_EARNED',
    UNI_GET_EARNED_SUCCESS = 'UNI_GET_EARNED_SUCCESS',
    UNI_GET_STAKED = 'UNI_GET_STAKED',
    UNI_GET_STAKED_SUCCESS = 'UNI_GET_STAKED_SUCCESS',
    UNI_GET_STAKE_TOKEN_BALANCE = 'UNI_GET_STAKE_TOKEN_BALANCE',
    UNI_GET_STAKE_TOKEN_BALANCE_SUCCESS = 'UNI_GET_STAKE_TOKEN_BALANCE_SUCCESS',
    UNI_GET_TOTAL_STAKED_SUCCESS = 'UNI_GET_TOTAL_STAKED_SUCCESS',
    UNI_GET_PERIOD_FINISH = 'UNI_GET_PERIOD_FINISH',
    UNI_GET_PERIOD_FINISH_SUCCESS = 'UNI_GET_PERIOD_FINISH_SUCCESS',
}

enum GameType {
    GAME_BOOST_LOAD_ALLOWANCE = 'GAME_LOAD_ALLOWANCE',
    GAME_BOOST_APPROVE = 'GAME_BOOST_APPROVE',
    GAME_BOOST_APPROVE_SUCCESS = 'GAME_BOOST_APPROVE_SUCCESS',
    GAME_BOOST_UP = 'GAME_BOOST_UP',
    GAME_BOOST_DOWN = 'GAME_BOOST_DOWN',
    GAME_LOAD_TOTAL_SUPPLY = 'GAME_LOAD_TOTAL_SUPPLY',
    GAME_LOAD_RED_TOTAL_SUPPLY_SUCCESS = 'GAME_LOAD_RED_TOTAL_SUPPLY_SUCCESS',
    GAME_LOAD_BLUE_TOTAL_SUPPLY_SUCCESS = 'GAME_LOAD_BLUE_TOTAL_SUPPLY_SUCCESS',
    GAME_LOAD_REBASE_HISTORY_SUCCESS = 'GAME_LOAD_REBASE_HISTORY_SUCCESS',
    GAME_REBASE = 'GAME_REBASE',
}

export type IActionType = 
    | BasicType
    | AccountType
    | TokenType
    | PoolType
    | GameType
    | UniType;

export const ActionType = {
    ...BasicType,
    ...AccountType,
    ...TokenType,
    ...PoolType,
    ...GameType,
    ...UniType,
};
