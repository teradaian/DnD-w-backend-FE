import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDetails } from '../../services/api-calls';


const ClassDetails = () => {
  const [classDetails, setClassDetails] = useState({})
  const [toggle, setToggle] = useState (false)
  let location = useLocation()

  useEffect(()=> {
    getDetails(location.state.classTitle.url)
    .then(classDetails => setClassDetails(classDetails))
  }, [])

  return (
    <>
      <div>
        {classDetails.name ?
          <div className='app'>
            <div className={toggle ? 'largeCard' : 'card'}>
                <div className={toggle ? 'largeHeader cardBtn' : '' }>
                  <img 
                    style={toggle ? { width: "200px", height: "200px" } : { width: "100px", height: "100px" }}
                    src={`/images/${classDetails.name}.svg`} 
                    alt="class-logo"
                  />
                  {toggle ?
                    <h1 style={{fontSize:"50px"}}>{classDetails.name.toUpperCase()}</h1>
                    :
                    <h1>{classDetails.name}</h1>
                  }
                  <button 
                    hidden={toggle ? false : true } 
                    onClick={()=> setToggle(!toggle)} 
                    style={{width: "40px", height:"40px", backgroundColor:"transparent", border:"none", color:"blue"}}
                  >
                    {toggle ? 'X' : 'Show Details'}
                  </button>
                </div>  
              <h3 hidden={toggle ? true : false}>Quick View</h3>
            <h3>Sub Classes</h3>
            {classDetails.subclasses.map((sub)=>(
              <p>{sub.name}</p>
            ))}
            <button hidden={toggle ? true : false} onClick={()=> setToggle(!toggle)} className='pulse smallCardBtn'>
              {toggle ? 'Hide Details' : 'Show Details'}
            </button>
            {toggle &&
              <div className='lowerCard'>
                <div className='lowerGridCard'>
                  <div>Hit die: d{classDetails.hit_die}</div>
                    <h3>Speed: {classDetails.speed}</h3>
                    <h3>Proficiencies:</h3>
                    {classDetails.proficiencies.map((proficiency) => (
                      <div key={proficiency.index}>{proficiency.name}</div>
                      ))}
                    <h3>Starting Stuff</h3>  
                    {classDetails.starting_equipment.map((stuff)=>(
                      <div key={stuff.index}>{stuff.equipment.name}</div>
                      ))}
                </div>

              </div>
            }
            </div>
          </div>
          :
          <>
            <h2>Loading class details...</h2>
          </>
        }
      </div>
    </>
  );
}
 
export default ClassDetails;
