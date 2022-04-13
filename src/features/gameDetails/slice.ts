import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLLiveFeedModel } from '../../models/live-feed';

import NHLStatsApiService from '../../services/nhl-stats-api-service';

export interface GameDetailsState {
    liveFeed: NHLLiveFeedModel;
    loading?: boolean;
}

const initialState: GameDetailsState = {
    liveFeed: {} as NHLLiveFeedModel,
    loading: false
}

export const getGameDetails = createAsyncThunk(
    'game-details',
    async (gameId: string) => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getGameDetails(gameId);
    }
);

export const gameDetailsSlice = createSlice({
    name: 'game-details',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getGameDetails.fulfilled, (state, action) => {
            state.liveFeed = action.payload;
            state.loading = false;
        })
        builder.addCase(getGameDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getGameDetails.rejected, (state) => {
            state.loading = false;
        })
    }
});
export default gameDetailsSlice.reducer;