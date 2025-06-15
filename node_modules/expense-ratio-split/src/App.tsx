
import './App.css'
import {useEffect, useState} from "react";
import {getInitialState} from "./helpers/initialState.ts";
import {saveStateToStorage} from "./helpers/storage.ts";
import TitledMoneyAmountInput from "./components/TitledMoneyAmountInput.tsx";
import NonEssentialSubscriptions from "./components/NonEssentialSubscriptions.tsx";
import type {ISubscription} from "./interfaces/state";
import OweSection from "./components/OweSection.tsx";
import Accordion from "./components/Accodion.tsx";
import IconButton from "./components/IconButton.tsx";
import {faPencil, faLock, faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {stateToUrl} from "./helpers/queryParams.ts";


function App() {
    const [enableEdit, setEnableEdit] = useState(false);
    const [state, setState] = useState(getInitialState)
    
    useEffect(() => {
        saveStateToStorage(state)
    }, [state])
    
    const setLukesWage = (value: number | undefined) => {
        setState({...state, lukeWage: value})
    }

    const setDalisWage = (value: number | undefined) => {
        setState({...state, daliWage: value})
    }
    
    const setRent = (value: number | undefined) => {
        setState({...state, rent: value})
    }

    const setUtility = (value: number | undefined) => {
        setState({...state, utility: value})
    }
    
    const setWater = (value: number | undefined) => {
        setState({...state, water: value})
    }

    const setWifi = (value: number | undefined) => {
        setState({...state, wifi: value})
    }
    
    const setFood = (value: number | undefined) => {
        setState({...state, food: value})
    }
    
    const addSubscription = (newSubscription: ISubscription) => {
        const alreadyHasSubscription = state.nonEssentialSubscriptions.some(sub => {
            return sub.title === newSubscription.title;
        })
        
        if (!alreadyHasSubscription) {
            setState({...state, nonEssentialSubscriptions: [...state.nonEssentialSubscriptions, newSubscription]})
        }
    }
    
    const updateSubscription = (index: number, newVal: number | undefined) => {
        const newSubscriptions = state.nonEssentialSubscriptions.map((sub, i) => {
            if (i === index) {
                return {...sub, cost: newVal};
            } else {
                return {...sub}
            }
        })
        
        setState({...state, nonEssentialSubscriptions: newSubscriptions})
    }
    
    const deleteSubscription = (index: number) => {
        const newSubscriptions = state.nonEssentialSubscriptions.filter((_sub, i) => {
            return i !== index;
        })

        setState({...state, nonEssentialSubscriptions: newSubscriptions})
    }
    
    const exportValues = () => {
        const url = stateToUrl(state);
        navigator.clipboard.writeText(url);
        alert("Export url copied to clipboard")
    }
    
    return (
        <div className="overflow-y-auto mb-5">
            <div className="mx-5 md:mx-20 lg:mx-60 mt-5 flex flex-col gap-5">
                <OweSection state={state} />
                
                <div className="flex gap-x-30 gap-y-5 bg-gray-200 p-5 rounded-md flex-wrap">
                    <div className="min-w-10 flex justify-center grow-1">
                        <TitledMoneyAmountInput 
                            title="Luke's Monthly Wage" 
                            value={state.lukeWage} 
                            setValue={setLukesWage} 
                            disabled={!enableEdit} 
                        />
                    </div>
                    <div className="min-w-5 flex justify-center grow-1">
                        <TitledMoneyAmountInput
                            title="Dali's Monthly Wage"
                            value={state.daliWage}
                            setValue={setDalisWage}
                            disabled={!enableEdit}
                        />
                    </div>
                </div>
                
                <IconButton 
                    icon={enableEdit ? faLock : faPencil} 
                    onClick={() => setEnableEdit(!enableEdit)}
                    className="self-center"
                    label={enableEdit ? "Lock Editting" : "Enable Editting"}
                />
                
                <Accordion title="Essentials">
                    <div className="flex flex-col gap-5">
                        <TitledMoneyAmountInput
                            title="Rent"
                            value={state.rent}
                            setValue={setRent}
                            disabled={!enableEdit}
                        />

                        <TitledMoneyAmountInput
                            title="Utilities"
                            value={state.utility}
                            setValue={setUtility}
                            disabled={!enableEdit}
                        />

                        <TitledMoneyAmountInput
                            title="Water"
                            value={state.water}
                            setValue={setWater}
                            disabled={!enableEdit}
                        />

                        <TitledMoneyAmountInput
                            title="Wifi"
                            value={state.wifi}
                            setValue={setWifi}
                            disabled={!enableEdit}
                        />

                        <TitledMoneyAmountInput
                            title="Food"
                            value={state.food}
                            setValue={setFood}
                            disabled={!enableEdit}
                        />
                    </div>
                </Accordion>
                
                <NonEssentialSubscriptions 
                    subscriptions={state.nonEssentialSubscriptions} 
                    addSubscription={addSubscription} 
                    removeSubscription={deleteSubscription} 
                    updateSubscription={updateSubscription} 
                    disabled={!enableEdit} 
                />
                
                <IconButton 
                    icon={faArrowUpRightFromSquare} 
                    onClick={exportValues}
                    className="self-start"
                />
            </div>
        </div>
    )
}

export default App
