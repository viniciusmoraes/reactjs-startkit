import { LOAD_LITERALS } from "../types";

const initialState = {}

export function LiteralsReducer(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_LITERALS:
            return action.payload;

        default:
            return state;

    }
}

export const getLiterals = (state: any) => state.literals;
