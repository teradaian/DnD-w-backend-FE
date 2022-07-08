import React, { useState, useEffect } from 'react'
import { getRaceList } from '../../services/api-calls'
import { getClassList } from '../../services/api-calls'
import { getClassStats } from '../../services/api-calls'
import { getRaceStats } from '../../services/api-calls'
import Die from '../../components/Die/Die'
// import Card from '../../components/Card/Card'

const CreateChar = () => {
  const [races, setRaces] = useState([])
  const [classes, setClasses] = useState([])
  // const [charClass, setCharClass] = useState({})
  // const [charRace, setCharRace] = useState([])
  // const [classDetails, setClassDetails] = useState({})
  const [STR, setSTR] = useState('')
  const [DEX, setDEX] = useState('')
  const [CON, setCON] = useState('')
  const [INT, setINT] = useState('')
  const [WIS, setWIS] = useState('')
  const [CHA, setCHA] = useState('')
  const [currentCharClass, setCurrentCharClass] = useState({})
  const [currentCharRace, setCurrentCharRace] = useState({})
  // const [statBonus, setStatBonus] = useState()
  const [strBonus, setStrBonus] = useState()
  const [dexBonus, setDexBonus] = useState()
  const [conBonus, setConBonus] = useState()
  const [intBonus, setIntBonus] = useState()
  const [wisBonus, setWisBonus] = useState()
  const [chaBonus, setChaBonus] = useState()

  useEffect(()=> {
    getClassList()
    .then(classData => setClasses(classData.results))
    getRaceList()
    .then(raceData => setRaces(raceData.results))
    getBonuses()
  }, [])

  const handleClassChange = (e) => {
    getClassStats(e.target.value.toLowerCase())
    .then(charClassData => setCurrentCharClass(charClassData))
  }
  
  const handleRaceChange = (e) => {
    getRaceStats(e.target.value.toLowerCase())
    .then(charRaceData => setCurrentCharRace(charRaceData))
  }
  
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
  
  function getRandomInt () {
    let min = Math.ceil(3);
    let max = Math.floor(18);
    return (Math.floor(Math.random() * (max - min) + min)) 
  }  
  
  const rollStat = (e) =>{
    let value = getRandomInt()
    return value
  }
  
  const rollStats = (e) =>{
    e.preventDefault()
    setSTR(rollStat())
    setDEX(rollStat())
    setCON(rollStat())
    setINT(rollStat())
    setWIS(rollStat())
    setCHA(rollStat())
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
 
  const randomIdx = Math.floor(Math.random() * 100)

  return ( 
    <div className='charSheet'>
      <div className='app'>
        <div className='card'>
          <img src={`https://robohash.org/${randomIdx}.png?set=set2`} alt="A scary monster!" width='250' />
        </div>
        <div className='card'>
          <h2>Your Character Deets</h2>
          <h3>Class : 
            <select onChange={ value =>  handleClassChange(value) } name="charClass" id="charClass">
              <option>Pick Class</option>
              {classes.map((char) => (
                <option value={char.name} key={char.index}  >{char.name}</option>
                ))}
            </select>
          </h3>
          <h3>Race : 
            <select onChange={ value =>  handleRaceChange(value) } name="charRace" id="charRace">
              <option>Pick Race</option>
              {races.map((race) => (
                <option value={race.name} key={race.index}>{race.name}</option>
              ))}
            </select>
          </h3>
          <div>
          </div>
          <h3>Hit die: {currentCharClass.hit_die}</h3>
        </div>
        <div>
          <Die></Die>
        </div>
      </div>
      <div className='app'>
        <div className='grid'>
          <div>
            <h4 className='icon-container stats'>STR: {STR} ({table[STR]}) Bonus:  {strBonus ? strBonus : 0} </h4>
            <h4 className='icon-container stats'>DEX: {DEX} ({table[DEX]}) Bonus:  {dexBonus ? dexBonus : 0} </h4>
            <h4 className='icon-container stats'>CON: {CON} ({table[CON]}) Bonus:  {conBonus ? conBonus : 0}</h4>
            <h4 className='icon-container stats'>INT: {INT} ({table[INT]}) Bonus:  {intBonus ? intBonus : 0}</h4>
            <h4 className='icon-container stats'>WIS: {WIS} ({table[WIS]}) Bonus:  {wisBonus ? wisBonus : 0}</h4>
            <h4 className='icon-container stats'>CHA: {CHA} ({table[CHA]}) Bonus:  {chaBonus ? chaBonus : 0}</h4>
            <form onSubmit={rollStats}>
              <button type="submit">Roll Stats</button>
            </form>
          </div> 
          <div className='card'> 
            <h2>Starting Proficiencies</h2>
            {currentCharRace.starting_proficiencies?.length ?
              <div>
                {currentCharRace.starting_proficiencies?.map((stat) => (
                  <p value={stat.name} key={stat.index}>{stat.name}</p>
                ))}
              </div>
            :
              <p>They got no special SKILLZ</p>
            }    
            <h2>Sub Races</h2>
              {currentCharRace.subraces?.length ?
              <div>
                {currentCharRace.subraces?.map((stat) => (
                  <p value={stat.name} key={stat.index}>{stat.name}</p>
                ))} 
              </div>
              :
              <p>No Sub Races</p>
              }
          </div> 
        </div>
      </div>
    </div>

  );
}
export default CreateChar;
