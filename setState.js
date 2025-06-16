import fs from "fs"
import path from "path";


export async function setState(state) {
    if (verifyState(state)) {
        fs.writeFileSync(path.join(import.meta.dirname, "state.json"), JSON.stringify(state));
        return true;
    }
    
    return false;
}

export function verifyState(state) {
    console.log(state);
    if (!state) return false;
    if (state.lukeWage && Number.isNaN(Number.parseFloat(state.lukeWage))) return false;
    
    return true;
}