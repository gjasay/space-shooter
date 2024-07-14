import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

function App() {
  //  References to the PhaserGame component (game and scene are exposed)
  const refPhaserGame = useRef<IRefPhaserGame>(null);

  return (
    <div id="app">
      <PhaserGame ref={refPhaserGame}/>
    </div>
  );
}

export default App;
