import { ACTION_UPDATE_SPEED, ACTION_UPDATE_WSPEED, ACTION_UPDATE_ISAUTO} from '../reducers/SpeedReducer';


export const updateWspeed = (Wspeed) => async dispatch =>{
    try {
        if(Wspeed<0)
            Wspeed = 0;
        else if(Wspeed>150)
            Wspeed = 150;
        dispatch({
            type: ACTION_UPDATE_WSPEED,
            Wspeed: Wspeed,
        })
    } catch(error){

    }
}

export const updateSpeed = (Speed) => async dispatch =>{
    try {
        if(Speed<0)
            Speed = 0;
        dispatch({
            type: ACTION_UPDATE_SPEED,
            speed: Speed,
        })
    } catch(error){

    }
}

export const updateIsAuto = (IsAuto) => async dispatch =>{
    try {
        dispatch({
            type: ACTION_UPDATE_ISAUTO,
            isAuto: IsAuto,
        })
    } catch(error){

    }
}