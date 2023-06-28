export const ACTION_UPDATE_SELECTVEHICLE='CAP_NHAT_PHUONG_TIEN';
export const ACTION_UPDATE_ENABLE_WARNING='CAP_NHAT_CANH_BAO_TOC_DO';
export const ACTION_UPDATE_ENABLE_SOUND='CAP_NHAT_CANH_BAO_AM_THANH';
export const ACTION_UPDATE_ENABLE_VOICE='CAP_NHAT_CANH_BAO_GIONG_NOI';
export const ACTION_UPDATE_WARNING_LEVEL='CAP_NHAT_CANH_MUC_CANH_BAO';
export const ACTION_UPDATE_SELECTSHORTCUT='CAP_NHAT_PHIM_TAT';
export const ACTION_UPDATE_ENABLE_SPEED='CAP_NHAT_DO_HO_TOC_DO';
export const ACTION_UPDATE_ISNIGHT='CAP_NHAT_CHE_DO_BAN_DEM';
export const ACTION_UPDATE_ENABLE_EXIT_BUTTON='CAP_NHAT_HIEN_THI_BUT_THOAT';
export const ACTION_UPDATE_ENABLE_WARNING_SCREEN='CAP_NHAT_MAN_HINH_NHAC_NHO';
export const ACTION_UPDATE_IS_UPDATE_WHEN_OPEN='TU_DONG_CAP_NHAT_KHI_MO_APP';

const initialState={
    selectVehicle: 1,
    isWarning: true,
    enableSound: true,
    selectSettingVoice: 0,
    warningLevel: 5,
    selectShortcut: 1,
    enableSpeed: true,
    isNight: false,
    enableExitBtn: true,
    enableWarningScreen: true,
    isUpdateWhenOpen: false,
}

export const settingsReducer = (state = initialState, action)=>{
    switch(action.type){
        case ACTION_UPDATE_SELECTVEHICLE:
            return{
                ...state,
                selectVehicle: action.selectVehicle,
            }
        case ACTION_UPDATE_ENABLE_WARNING:
            return{
                ...state,
                isWarning: action.isWarning,
            }  
        case ACTION_UPDATE_ENABLE_SOUND:
            return{
                ...state,
                enableSound: action.enableSound,
            }  
        case ACTION_UPDATE_ENABLE_VOICE:
            return{
                ...state,
                selectSettingVoice: action.selectSettingVoice,
            }
        case ACTION_UPDATE_WARNING_LEVEL:
            return{
                ...state,
                warningLevel: action.warningLevel,
            }
        case ACTION_UPDATE_SELECTSHORTCUT:
            return{
                ...state,
                selectShortcut: action.selectShortcut,
            }
        case ACTION_UPDATE_ENABLE_SPEED:
            return{
                ...state,
                enableSpeed: action.enableSpeed,
            }
        case ACTION_UPDATE_ISNIGHT:
            return{
                ...state,
                isNight: action.isNight,
            }
        case ACTION_UPDATE_ENABLE_EXIT_BUTTON:
            return{
                ...state,
                enableExitBtn: action.enableExitBtn,
            }
        case ACTION_UPDATE_ENABLE_WARNING_SCREEN:
            return{
                ...state,
                enableWarningScreen: action.enableWarningScreen,
            }
        case ACTION_UPDATE_IS_UPDATE_WHEN_OPEN:
            return{
                ...state,
                isUpdateWhenOpen: action.isUpdateWhenOpen,
            }
    }
    return state
}