import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLPlayerModel } from '../../models/player';
import { StatsSplitModel } from '../../models/stats';

import NHLStatsApiService from '../../services/nhl-stats-api-service';

export interface PlayerDetailsState {
    player: NHLPlayerModel;
    stats: StatsSplitModel;
}

const initialState: PlayerDetailsState = {
    player: {} as NHLPlayerModel,
    stats: {} as StatsSplitModel
}

export const getPlayerDetails = createAsyncThunk(
    'player/details',
    async (id: number) => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getPlayerDetails(id);
    }
);

export const getPlayerStats = createAsyncThunk(
    'player/details/stats',
    async (id: number) => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getPlayerStats(id);
    }
);

export const playerDetailsSlice = createSlice({
    name: 'playerDetails',
    initialState,
    reducers: {
        reinitialize: () => ({ ...initialState })
    },
    extraReducers: builder => {
        builder.addCase(getPlayerDetails.fulfilled, (state, action) => {
            state.player = action.payload;
        })
        .addCase(getPlayerStats.fulfilled, (state, action) => {
            state.stats = action.payload;
        })
    }
});
export const { reinitialize } = playerDetailsSlice.actions;
export default playerDetailsSlice.reducer;