export const ACTION_UPDATE_JOURNEYDIARY='CAP_NHAT_BANG_GHI_NHAT_KY';
export const ACTION_UPDATE_ISRUNNING='CAP_NHAT_GHI_NHAT_KY';

const initialState={
    distance: 0.0,
    highest: 0.0,
    timeDrive: null,
    isRunning: false,
}

export const journeyDiaryReducer = (state = initialState, action)=>{
    switch(action.type){
        case ACTION_UPDATE_JOURNEYDIARY:
            return{
                ...state,
                timeDrive:action.timeDrive,
                distance: action.distance,
                highest: action.highest,
            }
        case ACTION_UPDATE_ISRUNNING:
            return{
                ...state,
                isRunning: action.isRunning,
            }
    }
    return state
}