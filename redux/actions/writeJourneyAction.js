import { ACTION_UPDATE_JOURNEYDIARY, ACTION_UPDATE_ISRUNNING} from '../reducers/WriteJourneyDiary';


export const updateWritejourney = (Distance, Highest, TimeDrive) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_JOURNEYDIARY,
            distance: Distance,
            highest: Highest,
            timeDrive: TimeDrive,
        })
    } catch(error){
    }
}

export const updateIsRunning = (IsRunning) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ISRUNNING,
            isRunning: IsRunning,
        })
    } catch(error){

    }
}
