import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLScheduleGroupModel } from '../../models/schedule';

import NHLStatsApiService from '../../services/nhl-stats-api-service';

export interface ScheduleState {
    schedules: NHLScheduleGroupModel;
    currentScheduleIndex?: number,
    loading?: boolean;
}

const initialState: ScheduleState = {
    schedules: {} as NHLScheduleGroupModel,
    loading: false
}

export const getSchedule = createAsyncThunk(
    'schedules',
    async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
        debugger;
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getSchedule(startDate, endDate);
    }
);

export const scheduleSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        updateCurrentScheduleIndex: (state, action: PayloadAction<number>) => {
            state.currentScheduleIndex = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.loading = false;
        })
        builder.addCase(getSchedule.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSchedule.rejected, (state) => {
            state.loading = false;
        })
    }
});
export const { updateCurrentScheduleIndex } = scheduleSlice.actions;
export default scheduleSlice.reducer;