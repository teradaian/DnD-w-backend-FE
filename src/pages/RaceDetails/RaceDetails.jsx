import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDetails } from '../../services/api-calls';


const RaceDetails = () => {
  const [raceDetails, setRaceDetails] = useState({})
  const [toggle, setToggle] = useState (false)
  let location = useLocation()

  useEffect(()=> {
    getDetails(location.state.raceTitle.url)
    .then(raceDetails => setRaceDetails(raceDetails))
  }, [])

  return (
    <>
      <div>
        {raceDetails.name ?
          <div className='app'>
            <div className={toggle ? 'largeCard' : 'card'}>
              <div className={toggle ? 'largeHeader cardBtn' : '' }>
                <img 
                  style={toggle ? { width: "200px", height: "200px" } : { width: "100px", height: "100px" }}
                  src={`/images/${raceDetails.name}.png`} 
                  alt="class-logo"
                />
                {toggle ?
                  <h1 style={{fontSize:"50px"}}>{raceDetails.name.toUpperCase()}</h1>
                :
                  <h1>{raceDetails.name}</h1>
                }
                <button 
                  hidden={toggle ? false : true } 
                  onClick={()=> setToggle(!toggle)} 
                  style={{width: "40px", height:"40px", backgroundColor:"transparent", border:"none", color:"blue"}}
                >
                  {toggle ? 'X' : 'Show Details'}
                </button>
                <h3 hidden={toggle ? true : false}>Quick View</h3>
                <button hidden={toggle ? true : false} onClick={()=> setToggle(!toggle)} className='pulse smallCardBtn'>
                  {toggle ? 'Hide Details' : 'Show Details'}
                </button>
                </div>
                {toggle &&
                  <div>
                    <h3 hidden={toggle ? true : false} >quick view</h3>
                    <h4>Speed: {raceDetails.speed}</h4>
                    <h4>Alignment:</h4>
                    <p>{raceDetails.alignment} </p>
                    <h4>Languages</h4>
                    {raceDetails.languages?.length ? 
                      <>
                        {raceDetails.languages.map((info)=>
                          <div key={info.name}>
                            <p>{info.name}</p>
                          </div>
                        )}
                      </>
                    :
                      <p>This poor slob has no traits</p>
                    }
                    <h4>Size Description</h4>
                    <p>{raceDetails.size_description}</p>
                    <h3>Traits</h3>
                    {raceDetails.traits?.length ? 
                      <>
                        {raceDetails.traits.map((info)=>
                          <div key={info.name}>
                            <p>{info.name}</p>
                          </div>
                        )}
                      </>
                    :
                      <p>This poor slob has no traits</p>
                    }
                  </div>            
                }
            </div>
          </div>  
        :
          <>
            <h2>Loading race details...</h2>
          </>
        }
      </div>
    </>
  );
}

export default RaceDetails;
