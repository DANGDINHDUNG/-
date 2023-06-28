export const ACTION_UPDATE_ERROR_0TO19='0_19';
export const ACTION_UPDATE_ERROR_20TO39='20_39';
export const ACTION_UPDATE_ERROR_40TO59='40_59';
export const ACTION_UPDATE_ERROR_60TO79='60_79';
export const ACTION_UPDATE_ERROR_80TO99='80_99';
export const ACTION_UPDATE_ERROR_100UP='100';

const initialState={
    errorLevel0To19: 0.0,
    errorLevel20To39: 0.0,
    errorLevel40To59: 0.0,
    errorLevel60To79: 0.0,
    errorLevel80To99: 0.0,
    errorLevelMore100: 0.0,
}

export const errorLevelReducer = (state = initialState, action)=>{
    switch(action.type){
        case ACTION_UPDATE_ERROR_0TO19:
            return{
                ...state,
                errorLevel0To19: action.errorLevel0To19,
            }
        case ACTION_UPDATE_ERROR_20TO39:
            return{
                ...state,
                errorLevel20To39: action.errorLevel20To39,
            }
        case ACTION_UPDATE_ERROR_40TO59:
            return{
                ...state,
                errorLevel40To59: action.errorLevel40To59,
            }
        case ACTION_UPDATE_ERROR_60TO79:
            return{
                ...state,
                errorLevel60To79: action.errorLevel60To79,
            }
        case ACTION_UPDATE_ERROR_80TO99:
            return{
                ...state,
                errorLevel80To99: action.errorLevel80To99,
            }
        case ACTION_UPDATE_ERROR_100UP:
            return{
                ...state,
                errorLevelMore100: action.errorLevelMore100,
            }

    }
    return state
}