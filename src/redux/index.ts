import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducer from "./reducer";


// const store = createStore(reducer, applyMiddleware(thunk));
// export default store;

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["socket"] // navigation will not be persisted

};


// Redux persist
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));


export const persistor = persistStore(store);
