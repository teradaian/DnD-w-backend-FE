import React, { useState, useEffect } from 'react';
import { getDetails } from '../../../services/api-calls';
import { useLocation, useNavigate } from 'react-router-dom';
import AllItemDetails from './AllItemDetails/AllItemDetails';

const ItemDetails = () => {
  let navigate = useNavigate()
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
    <button onClick={()=> navigate('/store')}>Back</button>
  </>
  );
}
 
export default ItemDetails;