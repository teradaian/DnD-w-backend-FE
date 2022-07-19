import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getRaceList } from '../../services/api-calls'
import { getClassList } from '../../services/api-calls'
import { getClassStats } from '../../services/api-calls'
import { getRaceStats } from '../../services/api-calls'

const CharSheetView = () => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [strBonus, setStrBonus] = useState()
  const [dexBonus, setDexBonus] = useState()
  const [conBonus, setConBonus] = useState()
  const [intBonus, setIntBonus] = useState()
  const [wisBonus, setWisBonus] = useState()
  const [chaBonus, setChaBonus] = useState()
  const [currentCharRace, setCurrentCharRace] = useState({})
 
  const table = {
    3: "-4",
    4: "-3",
    5: "-3",
    6: "-2",
    7: "-2",
    8: "-1",
    9: "-1",  
    10:"+0",
    11:"+0",
    12:"+1",
    13:"+1",
    14:"+2",
    15:"+2",
    16:"+3",
    17:"+3",
    18:"+4",
  }

  const getBonuses = () => {
    setStrBonus(0)
    setDexBonus(0)
    setConBonus(0)
    setIntBonus(0)
    setWisBonus(0)
    setChaBonus(0)
    currentCharRace.ability_bonuses?.map((stat) => {
    
      if(stat.ability_score.index === 'str') {
        setStrBonus(stat.bonus)  
      }
      if(stat.ability_score.index === 'dex' ) {
        setDexBonus(stat.bonus)
      }
      if(stat.ability_score.index === 'con') {
        setConBonus(stat.bonus)
      }
      if(stat.ability_score.index === 'int') {
        setIntBonus(stat.bonus)
      }
      if(stat.ability_score.index === 'wis') {
        setWisBonus(stat.bonus)
      }
      if(stat.ability_score.index === 'cha') {
        setChaBonus(stat.bonus)
      }
    })
  }


  return ( 
    <>
      <div className='app'>
        <div className="card">
        <img 
          style={{ width: "100px", height: "100px" }}
          src={`/images/${state.class}.svg`} 
          alt="class-logo"
        />
         <img 
          style={{ width: "100px", height: "100px" }}
          src={`/images/${state.race}.png`} 
          alt="race-logo"
        />
          <h1>{state.name}</h1><br/>
          <h2>
            Class: {state.class}<br/>
            Race: {state.race}<br/>
            Level: {state.level}<br/>
            Alignment: <br/>{state.align}<br/>
          </h2>
        </div>
        <div className="card flexLeft">

          <h3 className="flexLeft" >STR: {state.str} ({table[state.str]}) </h3>
          <h3>INT: {state.int} ({table[state.int]}) </h3>
          <h3>DEX: {state.dex} ({table[state.dex]}) </h3>
          <h3>CON: {state.con} ({table[state.con]}) </h3>
          <h3>WIS: {state.wis} ({table[state.wis]}) </h3>
          <h3>CHA: {state.cha} ({table[state.cha]}) </h3>
                

        </div>
      </div>
      <button onClick={()=> navigate('/MyCharacters')}>Back</button>
    </>
  );
}
 
export default CharSheetView



