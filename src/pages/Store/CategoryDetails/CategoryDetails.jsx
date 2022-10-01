import React, { useState, useEffect } from 'react';
import { getDetails } from '../../../services/api-calls';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  const [categoryDetails, setCategoryDetails] = useState([])
  let location = useLocation()

  useEffect(() => {
    getDetails(location.state.cat.url)
    .then(categoryData => setCategoryDetails(categoryData))
  }, [] )


  return ( 
    <>
    <div className='app'>
      <div className='title card'>
        <h3>Item Deets</h3>
        <h2>{categoryDetails.name}</h2>
      </div>
    </div>  
    <div>
      <div>
        <div className='app'>
          {categoryDetails.equipment?.map((item) => (
            <div className="monster_card card" key={item.index}>
              <Link
                to="/storeItem"
                state={{ item }}
              >
                {item.name}
              </Link><br/>
            </div>
          ))}
        </div>
      </div>
    </div>  
  </>
  );
}
 
export default CategoryDetails;