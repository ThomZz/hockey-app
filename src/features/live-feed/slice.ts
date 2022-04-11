import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLLiveFeedModel } from '../../models/live-feed';

import NHLStatsApiService from '../../services/nhl-stats-api-service';

export interface LiveFeedState {
    liveFeed: NHLLiveFeedModel;
    loading?: boolean;
}

const initialState: LiveFeedState = {
    liveFeed: {} as NHLLiveFeedModel,
    loading: false
}

export const getLiveFeedDetails = createAsyncThunk(
    'live-feed',
    async (gameId: string) => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getLiveFeedDetails(gameId);
    }
);

export const liveFeedSlice = createSlice({
    name: 'live-feed',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLiveFeedDetails.fulfilled, (state, action) => {
            state.liveFeed = action.payload;
            state.loading = false;
        })
        builder.addCase(getLiveFeedDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLiveFeedDetails.rejected, (state) => {
            state.loading = false;
        })
    }
});
export default liveFeedSlice.reducer;