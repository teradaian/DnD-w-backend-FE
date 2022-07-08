import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const MyChars = (props) => {
  
  return ( 
    <>
      <div className='app'>
        <div>
          <h1 className='card title'>My Char Page</h1>
          <Link className='card' to='/createChar'>Create a New Charater</Link>
        </div>
      </div>
      <div className='app card'>
        here are all your Charaters
      </div>
    </>
   )
}
 
export default MyChars