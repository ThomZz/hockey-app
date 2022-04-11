import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeView from "../components/home/view";
import TeamDetailsView from "../components/teamDetails/view";
import PlayerDetailsView from "../components/playerDetails/view";
import { AppRoutes } from "./routes";
import GameLiveFeedView from "../components/game/view";

export default function AppRouter() {

  return (
    <Switch>
      <Route exact path="/">
        <HomeView title="Home" />
      </Route>
      <Route path={AppRoutes.routes.teamDetails.path}>
        <TeamDetailsRouter />
      </Route>
      <Route path={AppRoutes.routes.gameDetails.path}>
        <GameLiveFeedView title="Game Details"/>
      </Route>
    </Switch>
  );
}

function TeamDetailsRouter() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <TeamDetailsView title="Teams Details" />
      </Route>
      <Route path={`${path}${AppRoutes.routes.playerDetails.path}`}>
        <PlayerDetailsView title="Player Details" />
      </Route>
    </Switch>
  );
}