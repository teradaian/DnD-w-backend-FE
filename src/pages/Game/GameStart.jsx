import CharStats from "../../components/Game/CharStats/CharStats"


const GameStart = (props) => {
  return ( 
    <>
      <div className="app">
        <div className="app largeCard">
            <CharStats/>
        </div>
        <div className="app largeCard">
            <div>this is the main grid display</div>
        </div>
        <div className="app card">
            <div>this is the hitpoint area</div>
        </div>
        <div className="app card">
            <div>this is the hunger bar</div>
        </div>
        <div className="app card">
            <div>this is for the dungeon masters modal</div>
        </div>
      </div>
    </>
   )
}
 
export default GameStart