import { combineReducers } from "redux";
import { basicReducer } from "store/app/basicReducer";
import { accountReducer } from "store/account/accountReducer";
import { tokenReducer } from "store/token/tokenReducer";
import { poolReducer } from "store/pool/poolReducer";
import { gameReducer } from "store/game/gameReducer";

const appReducer = combineReducers({
    basic: basicReducer,
    account: accountReducer,
    token: tokenReducer,
    pool: poolReducer,
    game: gameReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
