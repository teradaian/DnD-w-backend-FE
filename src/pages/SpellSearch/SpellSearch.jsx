import { useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import { spellSearch } from '../../services/api-calls';
import SpellCard from '../../components/SpellCard/SpellCard';
import { Link } from "react-router-dom";

const SpellSearch = (props) => {
  const [spells, setSpells] = useState([])

  const handleSpellSearch = formData => {
    spellSearch(formData)
    .then(spellResults => setSpells(spellResults.results))
  }

  return (
    <>
      <div className='app'>
        <div>
          <h2 className='title card'>Such Spellz
            <SearchForm handleSpellSearch={handleSpellSearch} />
          </h2>
        </div>
      </div>  
      <div className='app'>
        {spells.length ? 
          <>
            {spells.map(spell => 
              <div className='app'>
                <div className="monster_card card">
                  <SpellCard className="card" key={spell.index} spell={spell} />
                </div>
              </div>
            )}
          </>
          :
          <div className='app card'>
            <h3>Please search for a spell!</h3>
          </div>
        }
      </div>
    </>
  );
}
 
export default SpellSearch;