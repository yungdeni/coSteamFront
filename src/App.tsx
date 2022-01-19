import React from "react";
import FriendList from "./shared/components/friendList";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { IFriend } from "./shared/interfaces/friend.interface";
import { IGame } from "./shared/interfaces/game.interface";
import axios from "axios";
import GameList from "./shared/components/gameList";
import { Button, Form, Card, Container } from "react-bootstrap";

function App() {
  async function get<T>(path: string): Promise<T> {
    const { data } = await axios.get(path);
    return data;
  }

  const [friends, setFriends] = useState<IFriend["friends"]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [steamid, setSteamid] = useState<string>("");
  const [games, setGames] = useState<IGame["games"]>([]);

  const getFriends = async (steamid: string) => {
    console.log("get");
    const results = await get<IFriend["friends"]>(
      `http://localhost:3001/friends?id=${steamid}`
    );
    setFriends(results);
  };
  const getGames = async (ids: string[]) => {
    const userAndFriends = [...ids, steamid];
    let resultParam = userAndFriends.map((a) => a).join("&id=");
    console.log(resultParam);
    const results = await get<IGame["games"]>(
      `http://localhost:3001/games?id=${resultParam}`
    );
    console.log(results);
    setGames(results);
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    getFriends(steamid);
  };

  // useEffect(() => {
  //   getFriends("76561198002549124")
  // }, [])

  return (
    <div className="App">
      <Container fluid className="p-0">
        <header className="App-header">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={"Header-Name"}>CoSteam</Form.Label>
              <Form.Control
                onChange={(e) => setSteamid(e.target.value)}
                placeholder="enter your SteamID here"
              />
              <Form.Text className="text-muted">
                Make sure you enter a valid SteamID with open profile
              </Form.Text>
            </Form.Group>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </header>
        <div>
          <FriendList
            selectedFriends={selectedFriends}
            setSelectedFriends={setSelectedFriends}
            friends={friends}
          />

          {selectedFriends.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => getGames(selectedFriends)}
            >
              Get common games
            </Button>
          )}
          <GameList games={games}></GameList>
        </div>
      </Container>
    </div>
  );
}

export default App;
