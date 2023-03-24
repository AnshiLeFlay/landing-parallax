import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { appReducer } from "./reducers";

export type AppDispatch = typeof store.dispatch;

export const store = createStore(appReducer, applyMiddleware(thunk));