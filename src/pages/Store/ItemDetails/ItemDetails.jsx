import React, { useState, useEffect } from 'react';
import { getDetails } from '../../../services/api-calls';
import { useLocation } from 'react-router-dom';
import AllItemDetails from './AllItemDetails/AllItemDetails';

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
        <AllItemDetails itemDetails={itemDetails}/>
      </div>
    </div>  
  </>
  );
}
 
export default ItemDetails;