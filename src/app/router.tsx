import { Routes, Route } from "react-router-dom";
import HomeView from "../components/home/view";
import TeamDetailsView from "../components/teamDetails/view";
import PlayerDetailsView from "../components/playerDetails/view";
import { AppRoutes } from "./routes";
import GameDetailsView from "../components/gameDetails/view";
import PlayersSearchView from "../components/playersSearch/view";

export default function AppRouter() {

  return (
    <Routes>
      <Route path="/" element={<HomeView title="Home" />} />
      <Route path={AppRoutes.routes.playersSearch.path} element={<PlayersSearchView title="Players Search"/>} />
      <Route path={`${AppRoutes.routes.teamDetails.path}`} element={ <TeamDetailsView title="Teams Details" />}  />
      <Route path={`${AppRoutes.routes.playerDetails.path}`} element={<PlayerDetailsView title="Player Details" />} />
      <Route path={AppRoutes.routes.gameDetails.path} element={ <GameDetailsView title="Game Details"/>} />
    </Routes>
  );
}