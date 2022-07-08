import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>
      <div className='app'>
        <div className='card'>
        <h1>Hello. This is a list of all the profiles.</h1>
        {profiles.length ? 
          <>
              <ul>
                {profiles.map(profile=>
                  <p key={profile._id}>{profile.name}</p>
                )}
              </ul>
          </>
          :
          <p>No profiles yet</p>
        }
      </div>
    </div>
  </>
  )
}
 
export default Profiles