import { LOAD_LITERALS } from "../types";

export const fetchLiterals = (literals: any)  => {
    return {
        type: LOAD_LITERALS,
        payload: literals
    }
}
