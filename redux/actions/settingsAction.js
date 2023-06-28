import { ACTION_UPDATE_SELECTVEHICLE, 
        ACTION_UPDATE_ENABLE_WARNING, 
        ACTION_UPDATE_ENABLE_SOUND, 
        ACTION_UPDATE_ENABLE_VOICE, 
        ACTION_UPDATE_WARNING_LEVEL, 
        ACTION_UPDATE_SELECTSHORTCUT, 
        ACTION_UPDATE_ENABLE_SPEED,
        ACTION_UPDATE_ISNIGHT,
        ACTION_UPDATE_ENABLE_EXIT_BUTTON,
        ACTION_UPDATE_ENABLE_WARNING_SCREEN,
        ACTION_UPDATE_IS_UPDATE_WHEN_OPEN } from "../reducers/settingsReducer";

export const updateSettingVehicle = (SelectVehicle) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_SELECTVEHICLE,
            selectVehicle: SelectVehicle,
        })
    } catch(error){

    }
}

export const updateSettingIsWarning = (IsWarning) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_WARNING,
            isWarning: IsWarning,
        })
    } catch(error){

    }
}

export const updateSettingEnableSound = (EnableSound) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_SOUND,
            enableSound: EnableSound,
        })
    } catch(error){

    }
}

export const updateSettingEnableVoice = (SelectSettingVoice) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_VOICE,
            selectSettingVoice: SelectSettingVoice,
        })
    } catch(error){

    }
}

export const updateSettingWarningLevel = (WarningLevel) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_WARNING_LEVEL,
            warningLevel: WarningLevel,
        })
    } catch(error){

    }
}

export const updateSettingSelectShortcut = (SelectShortcut) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_SELECTSHORTCUT,
            selectShortcut: SelectShortcut,
        })
    } catch(error){

    }
}

export const updateSettingEnableSpeedometer = (EnableSpeed) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_SPEED,
            enableSpeed: EnableSpeed,
        })
    } catch(error){

    }
}

export const updateSettingIsNight = (IsNight) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ISNIGHT,
            isNight: IsNight,
        })
    } catch(error){

    }
}

export const updateSettingEnableExitBtn = (EnableExitBtn) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_EXIT_BUTTON,
            enableExitBtn: EnableExitBtn,
        })
    } catch(error){

    }
}

export const updateSettingEnableWarningScreen = (EnableWarningScreen) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ENABLE_WARNING_SCREEN,
            enableWarningScreen: EnableWarningScreen,
        })
    } catch(error){

    }
}

export const updateSettingIsUpdateWhenOpen = (IsUpdate) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_IS_UPDATE_WHEN_OPEN,
            isUpdateWhenOpen: IsUpdate,
        })
    } catch(error){

    }
}