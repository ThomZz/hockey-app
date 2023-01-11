import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '../features/team/slice';
import teamDetailsReducer from '../features/teamDetails/slice';
import playerDetailsReducer from '../features/playerDetails/slice';
import teamScheduleReducer from '../features/teamSchedule/slice';
import scheduleReducer from '../features/schedule/slice';
import liveFeedReducer from '../features/gameDetails/slice';
import playerSearchReducer from '../features/playerSearch/slice';

const store = configureStore({
    reducer: {
        team: teamReducer,
        playerSearch: playerSearchReducer,
        teamDetails: teamDetailsReducer,
        playerDetails: playerDetailsReducer,
        teamSchedule: teamScheduleReducer,
        schedule: scheduleReducer,
        gameDetails: liveFeedReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;