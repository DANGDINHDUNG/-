import { ACTION_UPDATE_ERROR_0TO19,
        ACTION_UPDATE_ERROR_20TO39,
        ACTION_UPDATE_ERROR_40TO59,
        ACTION_UPDATE_ERROR_60TO79,
        ACTION_UPDATE_ERROR_80TO99,
        ACTION_UPDATE_ERROR_100UP } from "../reducers/errorLevelReducer"

export const updateError0To19 = (ErrorLevel0To19) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_0TO19,
            errorLevel0To19: ErrorLevel0To19,
        })
    } catch(error){

    }
}

export const updateError20To39 = (ErrorLevel20To39) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_20TO39,
            errorLevel20To39: ErrorLevel20To39,
        })
    } catch(error){

    }
}

export const updateError40To59 = (ErrorLevel40To59) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_40TO59,
            errorLevel40To59: ErrorLevel40To59,
        })
    } catch(error){

    }
}

export const updateError60To79 = (ErrorLevel60To79) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_60TO79,
            errorLevel60To79: ErrorLevel60To79,
        })
    } catch(error){

    }
}

export const updateError80To99 = (ErrorLevel80To99) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_80TO99,
            errorLevel80To99: ErrorLevel80To99,
        })
    } catch(error){

    }
}

export const updateError100Up = (ErrorLevelMore100) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ERROR_100UP,
            errorLevelMore100: ErrorLevelMore100,
        })
    } catch(error){

    }
}