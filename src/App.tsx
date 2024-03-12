import { CSSProperties, MouseEventHandler, useRef, useState } from 'react'
import './App.css'
import trackSrc from '/quest.mp3'
import { AcademyStats } from './AcademyStats';

function App() {
  const [game, setGame] = useState({"players": [], "current": -1});

  const audioCtxContainer = useRef(new AudioContext);

  let ms = navigator.mediaSession;
  if (game.current != -1) {
    ms.metadata = new MediaMetadata({
    title: `${game.players[game.current].name} should have taken ${game.players[game.current].sips} sips`
    });
  }

  const setAudioContext: MouseEventHandler<HTMLMediaElement> = (ev) => {
    const ac = new AudioContext();
    audioCtxContainer.current = ac;
    let track = ac.createMediaElementSource(ev.currentTarget);
    track.connect(ac.destination);
  }

  const elementStyle = {
    "display": "block",
    "height": "5em",
    "width": "5em",
    "background": "white"
  } as CSSProperties;



  return (
    <>
      <div>
        <audio
          controls
          src={trackSrc}
          onClick={setAudioContext}
          style={elementStyle}
        > Hello </audio>
      </div>
      <AcademyStats game={game} setGame={setGame} gameId="24750" />
    </>
  )
}

export default App
