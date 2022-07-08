import { getMonsterList } from "../../services/api-calls";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const MonsterList = (props) => {
  const [monsterList, setMonsterList] = useState([])

  useEffect(() => {
    getMonsterList()
    .then(monsterData => setMonsterList(monsterData.results))
  }, [])

  return ( 
    <>
      <div className="app">
        <h2 className="title card" >Monster List</h2>
      </div>
      <div className="app">
        {monsterList.length ? 
        <>
          {monsterList.map((monster) => (
            <div className="monster_card card" key={monster.index}>
              <Link
                to="/monster"
                state={{ monster }}
              >
                {monster.name}
              </Link><br/>
            </div>
          ))}
        </>
        :
        <>
          <h2>Loading scary monsters...</h2>
        </>}
      </div>
    </>
  );
}
 
export default MonsterList;