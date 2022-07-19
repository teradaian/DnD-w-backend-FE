import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const CharSheetView = () => {
  const {state} = useLocation()
  const navigate = useNavigate()

  return ( 
    <>
      <div className='app'>
        <div className="card">
          <h1>{state.name}</h1><br/>
          <h2>
            Class: {state.class}<br/>
            Race: {state.race}<br/>
            Level: {state.level}<br/>
          </h2>
        </div>
        <div className="card">

          <h3>STR: {state.str}</h3>
          <h3>INT: {state.int}</h3>
          <h3>DEX: {state.dex}</h3>
          <h3>CON: {state.con}</h3>
          <h3>WIS: {state.wis}</h3>
          <h3>CHA: {state.cha}</h3>

        </div>
      </div>
      <button onClick={()=> navigate('/MyCharaters')}>Back</button>
    </>
  );
}
 
export default CharSheetView