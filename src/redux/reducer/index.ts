import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import LangReducer from "./LangReducer";
import WifiReducer from "./WifiReducer";
import SocketReducer from "./SocketReducer";
import DeviceReducer from "./DeviceReducer";

const reducer = combineReducers({
    user: UserReducer,
    lang: LangReducer,
    wifi: WifiReducer,
    socket: SocketReducer,
    devices: DeviceReducer

});
export type RootReducerProps = ReturnType<typeof reducer>
export default reducer;
