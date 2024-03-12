import { useEffect, useState } from "react";


const URL = "https://academy.beer"

async function fetchGame(gameId) {
  let response = await fetch(`${URL}/api/games/${gameId}/`);
  return response;
}

export function AcademyStats({ game, setGame, gameId }) {
  useEffect(() => {
    const intervalID = window.setInterval(()=>{

    fetchGame(gameId)
    .then((response) => response.json())
    .then((data) => {
      setGame({
        players: data.player_stats.map((pstat) => {
          return {"name": pstat['username'], "sips": pstat['total_sips']}
        } ),
        current: data['cards'].length % data.player_stats.length
      });
    })}, 1000);

    return () => {
      window.clearInterval(intervalID);
    };
  }, [gameId, setGame]);

  return <>
    <h1>
      The Game looks as thus:</h1> 
      <div className="monospaced">{JSON.stringify(game)}
      </div>
  </>
}
