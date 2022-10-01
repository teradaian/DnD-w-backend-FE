import React, { useState, useEffect } from 'react';
import { getDetails } from '../../../services/api-calls';
import { useLocation } from 'react-router-dom';


const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState([])
  let location = useLocation()
  console.log(itemDetails);
  useEffect(() => {
    getDetails(location.state.item.url)
    .then(itemData => setItemDetails(itemData))
  }, [] )


  return ( 
    <>
    <div className='app'>
      
      <div className='largeCard'>
        <h3>{itemDetails.name}</h3>
        <h3>Weight: {itemDetails.weight} lbs</h3>
        <h4>Cost: {itemDetails.cost?.quantity}{itemDetails.cost?.unit}</h4>
        {itemDetails.special
        ? <h3>
          {itemDetails.special}
          </h3> 
          
        : <h3>
          Nothing special to mention
          </h3>
        }
      </div>
    </div>  
  </>
  );
}
 
export default ItemDetails;