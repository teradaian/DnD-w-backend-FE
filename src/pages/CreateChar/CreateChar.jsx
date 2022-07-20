import React, { useState, useEffect, useRef } from 'react'
import { getRaceList } from '../../services/api-calls'
import { getClassList } from '../../services/api-calls'
import { getClassStats } from '../../services/api-calls'
import { getRaceStats } from '../../services/api-calls'
import Die from '../../components/Die/Die'
import * as charSheetService from '../../services/charSheetService'
import { useNavigate } from 'react-router-dom'

const CreateChar = () => {
  const navigate = useNavigate()
  const [races, setRaces] = useState([])
  const [classes, setClasses] = useState([])
  const [charClass, setCharClass] = useState({})
  const [charRace, setCharRace] = useState([])
  const [classDetails, setClassDetails] = useState({})
  const [STR, setSTR] = useState(null)
  const [DEX, setDEX] = useState(null)
  const [CON, setCON] = useState(null)
  const [INT, setINT] = useState(null)
  const [WIS, setWIS] = useState(null)
  const [CHA, setCHA] = useState(null)
  const [currentCharClass, setCurrentCharClass] = useState({})
  const [currentCharRace, setCurrentCharRace] = useState({})
  const [statBonus, setStatBonus] = useState()
  const [strBonus, setStrBonus] = useState()
  const [dexBonus, setDexBonus] = useState()
  const [conBonus, setConBonus] = useState()
  const [intBonus, setIntBonus] = useState()
  const [wisBonus, setWisBonus] = useState()
  const [chaBonus, setChaBonus] = useState()
  const [charName, setCharName] = useState()
  const [charSheet, setCharSheet] = useState([])
  const [roll4Stat, setRoll4Stat] = useState('')
  const [count, setCount] = useState(0)
  const formElement = useRef()
  const [toggle,setToggle]=useState(false)
  const [validForm, setValidForm] = useState(false)
  const [inv, setInv] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    race: '',
    level: 1,
    background:'',
  })

  const backgrounds =['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin']

  useEffect(() => {
    formElement.current.checkValidity() && STR!==null && DEX!==null&& CON!==null && INT!==null && WIS!==null && CHA!==null ? setValidForm(true) : setValidForm(false)
  }, [formData,STR,DEX,CON,WIS,INT,CHA])
  
  useEffect(()=> {
    getClassList()
    .then(classData => setClasses(classData.results))
    getRaceList()
    .then(raceData => setRaces(raceData.results))
    getBonuses()
  }, [currentCharRace.ability_bonuses])

  useEffect(() => {
    const getInv =()=>{
      currentCharClass.starting_equipment?.map(stuff => {
        setInv([...inv, stuff.equipment.name])
      })    
    }
    getInv()
  }, [currentCharClass]);


  const handleAddCharSheet = async (newCharSheetData) => {
    const newCharSheet = await charSheetService.create(newCharSheetData)
    setCharSheet([...charSheet, newCharSheet])
    navigate('/MyCharacters')
  }

  const handleClassChange = (e) => {
    getClassStats(e.target.value.toLowerCase())
    .then(charClassData => setCurrentCharClass(charClassData))
  }
  
  const handleRaceChange = (e) => {
    getRaceStats(e.target.value.toLowerCase())
    .then(charRaceData => setCurrentCharRace(charRaceData))
  }
  
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
    console.log(formData);
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const form={
      name: formData.name,
      class: formData.class,
      race: formData.race,
      level: formData.level,
      align: formData.align,
      background: formData.background,
      str: STR,
      dex: DEX,
      con: CON,
      int: INT,
      wis: WIS,
      cha: CHA,
      inv: inv
    }
    handleAddCharSheet(form)
  }
  
  function handleToggle () {
    statRoll()
    setToggle(!toggle)
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

  
  function rollDSix () {
    
    let d6Roll = [1,2,3,4,5,6]
    const randomNumber = (value) => { 
      let item = value[Math.floor(Math.random() * value.length)]
      return item
    }
    return randomNumber(d6Roll)
  }
  
  function statRoll (){
    if (count < 6) {
      let roll1 = rollDSix()
      let roll2 = rollDSix()
      let roll3 = rollDSix()
      let statNumber = roll1 + roll2 + roll3
      setRoll4Stat(statNumber)
      statNumber = 0
      setCount(count + 1)
    }else{
      setRoll4Stat('No More Rolls')
      return "no more rolls"
    }
    console.log(count);
  }
  
  const getBonuses = () => {
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
    <div className='charSheet'>
      <div className='app'>
        <div className='card title'>
          <h2>Character Deets</h2>
        </div>
      </div>
      <div className='app'>
        <div className='grid'>
          <div className='card'>
            <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
              <div>
                <label className="form-label">
                  Character's Name
                </label>
                <input 
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Character's Class<br/>
                </label>
                <div 
                  type="text"
                  className="form-control"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <select onChange={ value =>  handleClassChange(value) } name="class" id="class">
                    <option>Pick Class</option>
                    {classes.map((char) => (
                      <option value={char.name} key={char.index}  >{char.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">
                  Character's Race<br/>
                </label>    
                <div 
                  type="text"
                  className="form-control"
                  id="race"
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  required
                >
                  <select onChange={ value =>  handleRaceChange(value) } name="race" id="race">
                    <option>Pick Race</option>
                    {races.map((race) => (
                      <option value={race.name} key={race.index}>{race.name}</option>
                    ))}
                  </select>
                </div>
                <label className="form-label">
                  Character's Alignment<br/>
                </label> 
                <div 
                  type="text"
                  className="form-control"
                  id="align"
                  name="align"
                  value={formData.align}
                  onChange={handleChange}
                  required
                >
                  <select name="align" id="align">
                    <option>Pick Alignment</option>
                      <option value='Lawful Good' >Lawful Good</option>
                      <option value='Neutral Good' >Neutral Good</option>
                      <option value='Chaotic Good' >Chaotic Good</option>
                      <option value='Lawful Neutral' >Lawful Neutral</option>
                      <option value='Neutral' >Neutral</option>
                      <option value='Chaotic Neutral' >Chaotic Neutral</option>
                      <option value='Lawful Evil'>Lawful Evil</option>
                      <option value='Neutral Evil' >Neutral Evil</option>
                      <option value='Chaotic Evil' >Chaotic Evil</option>
                  </select>
                </div>
                <label className="form-label">
                  Character's Background<br/>
                </label>    
                <div 
                  type="text"
                  className="form-control"
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  required
                >
                  <select name="background" id="background">
                    <option>Pick Background</option>
                    {backgrounds.map((bg,idx) => (
                      <option value={bg} key={idx}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">
                  Character's level<br/>
                </label>
                <input 
                  type="number"
                  className="form-control"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                /><br/>
              </div>
              <div className="form-control">
                  <label className="form-label">
                    Character's Attr:<br/>
                  </label>   
                  <h4 className="form-control" value={STR} name="str" id="str" >STR: {STR}</h4>
                  <h4 className="form-control" value={DEX} name='dex' id='dex' >DEX: {DEX}</h4>
                  <h4 className="form-control" value={CON} name='con' id='con' >CON: {CON}</h4>
                  <h4 className="form-control" value={INT} name='int' id='int' >INT: {INT}</h4>
                  <h4 className="form-control" value={WIS} name='wis' id='wis' >WIS: {WIS}</h4>
                  <h4 className="form-control" value={CHA} name='cha' id='cha' >CHA: {CHA}</h4>   

              </div>
              <div>
                <button
                  type="submit"
                  disabled={!validForm}
                >
                  Add Character
                </button>
              </div>
            </form>
          </div>
          <div className='stats'>
            <h1>{roll4Stat}<br/>
              </h1>
            <button 
              onClick={() => {handleToggle()} }  
              hidden={toggle ? true : false}
            >Roll Stat</button>
                  <h4>STR: {STR===null ? <button hidden={toggle ? false : true} onClick={()=>{setSTR(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : `Rolled` }</h4>
                  <h4>DEX: {DEX===null ? <button hidden={toggle ? false : true} onClick={()=>{setDEX(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : 'Rolled' }</h4>
                  <h4>CON: {CON===null ? <button hidden={toggle ? false : true} onClick={()=>{setCON(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : 'Rolled' }</h4>
                  <h4>INT: {INT===null ? <button hidden={toggle ? false : true} onClick={()=>{setINT(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : 'Rolled' }</h4>
                  <h4>WIS: {WIS===null ? <button hidden={toggle ? false : true} onClick={()=>{setWIS(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : 'Rolled' }</h4>
                  <h4>CHA: {CHA===null ? <button hidden={toggle ? false : true} onClick={()=>{setCHA(roll4Stat);setToggle();setRoll4Stat('Roll')}}>Add Stat</button> : 'Rolled' }</h4>
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
            <h2>Starting Stuff</h2>
            {currentCharClass.starting_equipment?.map((stuff,idx) =>
              <p key={idx}>{stuff.equipment.name}</p> 
            )}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default CreateChar





