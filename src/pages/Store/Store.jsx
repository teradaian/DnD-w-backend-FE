import { getStore } from "../../services/api-calls";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Store = (props) => {
  const [storeList, setStoreList] = useState([])

  useEffect(() => {
    getStore()
    .then(storeData => setStoreList(storeData.results))
  }, [])
  console.log(storeList);
 
  return ( 
    <>
      <div className="app">
        <h2 className="title card" >Store List</h2>
      </div>
      <div className="app">
        {storeList?.length ? 
        <>
          {storeList.map((cat) => (
            <div className="monster_card card" key={cat.index}>
              <Link
                to="/monster"
                state={{ cat }}
              >
                {cat.name}
              </Link><br/>
            </div>
          ))}
        </>
        :
        <>
          <h2>Loading store...</h2>
        </>}
      </div>
    </>
  );
}
 
export default Store;