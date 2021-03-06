import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { allUsersReducer } from "./allUsersReducer";
import { authReducer } from "./authReducer";
import { currentUserReducer } from "./currentUserReducer";
import { mainAppReducer } from "./mainAppReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
	allUsers: allUsersReducer,
	appState: mainAppReducer,
	foundUser: currentUserReducer,
	auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
