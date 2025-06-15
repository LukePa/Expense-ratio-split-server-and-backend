import type {IState} from "../interfaces/state";
import {getStateFromStorage} from "./storage.ts";
import {updateStateFromParams} from "./queryParams.ts";


export function getInitialState(): IState {
    const state = getStateFromStorage();
    updateStateFromParams(state)
    return state;
}