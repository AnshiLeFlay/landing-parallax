import { DEFAULT, TActions } from "../actions";

type TInitialState = {};

const initialState: TInitialState = {};

export const appReducer = (
    state = initialState,
    action: TActions
): TInitialState => {
    switch (action.type) {
        case DEFAULT: {
            return {
                ...state,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
