import "reflect-metadata";
import { container } from "tsyringe";
import NHLStatsApiService from "./services/nhl-stats-api-service";
import Logger from "./services/logger";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { Provider } from 'react-redux';
import NHLSuggestApiService from "./services/nhl-suggest-api-service";

container.register<Logger>(Logger, { useClass: Logger });
container.register<NHLStatsApiService>(NHLStatsApiService, { useClass: NHLStatsApiService });
container.register<NHLSuggestApiService>(NHLSuggestApiService, { useClass: NHLSuggestApiService });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
