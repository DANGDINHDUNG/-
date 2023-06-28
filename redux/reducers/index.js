import { combineReducers } from "redux";
import { speedReducer } from "./SpeedReducer";
import { journeyDiaryReducer } from "./WriteJourneyDiary";
import { settingsReducer } from "./settingsReducer";
import { errorLevelReducer } from "./errorLevelReducer";


export const reducer = combineReducers(
    {
        speedInfo: speedReducer,
        writeJourneyInfo: journeyDiaryReducer,
        settingsInfo: settingsReducer,
        errorLevelInfo: errorLevelReducer,
    }
)