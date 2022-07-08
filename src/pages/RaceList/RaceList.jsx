import { useEffect, useState } from 'react'
import { getRaceList } from '../../services/api-calls'
import { Link } from 'react-router-dom'

const RaceList = (props) => {
  const [races, setRaces] = useState([])

  useEffect(()=> {
    getRaceList()
    .then(raceData => setRaces(raceData.results))
  }, [])
  return (
    <>
      <div className='app'>
        <h2 className='title card'>Race List</h2>
      </div>  
      <div className='app'>
        <div className='icon-container zoom'>
          {races.map((raceTitle) => (
            <Link to='/race' state={{raceTitle}} key={raceTitle.index}>
              <div id="classDiv" >
                <img 
                  style={{ width: "100px", height: "100px" }}
                  src={`/images/${raceTitle.name}.png`} 
                  alt="class-logo"
                  />
                {raceTitle.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
 
export default RaceList;