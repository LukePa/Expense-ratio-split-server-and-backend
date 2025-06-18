import fs from "fs";
import path from "path";
import {getDirname} from "./helpers.js";


export default function getState() {
    let state = {};
    
    try {
        const contents = fs.readFileSync(path.join(getDirname(), "state.json"));
        state = JSON.parse(contents);
    } catch (err) {
        fs.writeFileSync(path.join(import.meta.dirname, "state.json"), "{}");
    }
    
    return state;
    
}