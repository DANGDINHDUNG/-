export const ACTION_UPDATE_WSPEED='CAP_NHAT_TOC_DO_TOI_DA';
export const ACTION_UPDATE_SPEED='CAP_NHAT_TOC_DO';
export const ACTION_UPDATE_ISAUTO='CAP_NHAT_ISAUTO';

const initialState={
    speed: 0,
    Wspeed: 50,
    isAuto: true,
}

export const speedReducer = (state = initialState, action)=>{
    switch(action.type){
        case ACTION_UPDATE_SPEED:
            return{
                ...state,
                speed:action.speed,
            }
        case ACTION_UPDATE_WSPEED:
            return{
                ...state,
                Wspeed: action.Wspeed,
            }
        case ACTION_UPDATE_ISAUTO:
            return{
                ...state,
                isAuto: action.isAuto,
            }
    }
    return state
}