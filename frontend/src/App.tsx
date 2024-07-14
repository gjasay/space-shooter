import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { Game } from './game/scenes/Game';
import { Leaderboard } from './leaderboard';
import './app.css';

function App()
{
  //  References to the PhaserGame component (game and scene are exposed)
  const refPhaserGame = useRef<IRefPhaserGame>(null);
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      if (refPhaserGame.current) {
        //@ts-expect-error scene should be Game when updating
        const scene: Game = refPhaserGame.current.scene;
        if (scene && scene.scene.key === 'Game') {
          setHealth(scene.player.health);
          setScore(scene.score);
          setAmmo(scene.player.ammo);
        } else if (scene && scene.scene.key === 'GameOver') {
          setGameOver(true);
          setHealth(0);
        } else if (scene && scene.scene.key === 'MainMenu') {
          setHealth(100);
          setScore(0);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="app">
      <div id='title'>
        <h1>2D Space Shooter</h1>
      </div>
      {!gameOver && <PhaserGame ref={refPhaserGame} />}
      {gameOver && <Leaderboard />}
      <div id='ui'>
        <div id="game-variables">
          <h2>Health: {health}</h2>
          <h2>Ammo: {ammo}</h2>
        </div>
        
        <div id='controls'>
          <h2 id='control-header'>Controls:</h2>
          <h2>Move: WASD</h2>
          <h2>Shoot: Space</h2>
          <h2>Pause: ESC</h2>
        </div>
        <div id='scoring'>
          <h2>Score: {score}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
