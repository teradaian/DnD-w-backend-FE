import React from 'react'
import './PrintPage.css'
import { useState } from 'react';


const PrintPage = (props) => {



  return (  
    <>
      <div className='app largeCard'>
        <div className='charSheet'>
          <h1 id='charName'>char name</h1>
          <div id='class'>class</div>
          <div id='level'>level</div>
          <div id='playerName'>player name</div>
          <div id='race'>race</div>
          <div id='align'>alignment</div>
          <div id='str'>16</div>
          <div id='dex'>11</div>
          <div id='con'>15</div>
          <div id='int'>17</div>
          <div id='wis'>18</div>
          <div id='cha'>11</div>
          <div id='inspir'>333</div>
          <div id='profBonus'>55</div>
          <div id='st-str'>str</div>
          <div id='st-dex'>dex</div>
          <div id='st-con'>con</div>
          <div id='st-int'>int</div>
          <div id='st-wis'>wis</div>
          <div id='st-cha'>cha</div>
          <div id='armorClass'>3</div>
          <div id='init'>16</div>
          <div id='speed'>22</div>
          <div>hit dice</div>
        </div>
      </div>
    </>
  )
}
 
export default PrintPage;