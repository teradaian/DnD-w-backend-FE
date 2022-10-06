import CharStats from "../../components/Game/CharStats/CharStats"
import HitPoints from "../../components/Game/HitPoints/HitPoints"
import GameMap from '../../components/Game/GameMap/GameMap'
import { useLocation } from "react-router-dom"

const GameStart = () => {
  const {state} = useLocation()
  
  return ( 
    <>
      <div className="app">
        <div className="app inline">
          <CharStats state={state}/>
          <GameMap/>
        </div>
        <div className="app card">
            <HitPoints state={state}/>
        </div>
        <div className="app card">
            <div>Inventory stuff</div>
        </div>
        <div className="app card">
            <div>this is for the dungeon masters modal</div>
        </div>
      </div>
    </>
   )
}
 
export default GameStart