import React from "react";
import { IGame as Props} from "../interfaces/game.interface";

interface Iprops {
    games: Props["games"]
}

const GameList: React.FC<Iprops> = ({games}) => {

    const renderList = () => {
    const filteredGames = games.filter(game => {
        return game.multiplayer
    })
        return filteredGames.map((g) => {
            return (
                <li key={g.appid}>
                    <a href={`https://store.steampowered.com/app/${g.appid}`} target="_blank" rel="noreferrer">
                    <img alt="" src={g.headerimage}></img>
                    </a>
                    <p>{g.name}</p>
                </li>
            )
        })
    }

    return (
        <div>
        {games.length > 0 && <h1>Your common games</h1>}
        <ul>
            {renderList()}
        </ul>
        </div>
        
    )
}

export default GameList