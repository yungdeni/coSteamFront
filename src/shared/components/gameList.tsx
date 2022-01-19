import React from "react";
import { IGame as Props } from "../interfaces/game.interface";
import { Card, Button } from "react-bootstrap";

interface Iprops {
  games: Props["games"];
}

const GameList: React.FC<Iprops> = ({ games }) => {
  const renderList = () => {
    const filteredGames = games.filter((game) => {
      return game.multiplayer;
    });
    return filteredGames.map((g) => {
      return (
        <li className={"GameList-Items"} key={g.appid}>
          <a
            href={`https://store.steampowered.com/app/${g.appid}`}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="" src={g.headerimage}></img>
          </a>
        </li>
      );
    });
  };

  return (
    <div>
      {games.length > 0 && <h2 className={"Header-Text"}>Your common games</h2>}

      <div>
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
};

export default GameList;
