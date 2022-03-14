import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDelay from './hooks/useDelay';

const App = () => {
  const [search, setSearch] = useState('');
  const [saveData, setSaveData] = useState<string[]>([]);

  const findPokemon = async (val: string) => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + val);
      const json = await res.json();
      setSaveData([...saveData, `<img src=${json.sprites.front_default} />`]);
    } catch (err) {
      setSaveData([...saveData, `${val} not found`]);
    }
  };
  const { setDelayContent } = useDelay(findPokemon, 600);

  const onChanged = (evt: ChangeEvent<HTMLInputElement>) => {
    const val = evt.currentTarget.value;
    setSearch(val);

    setDelayContent(val);
  };

  return (
    <div className="App">
      <div className="search">
        <div className="searchBar">
          <input type="search" onChange={onChanged} />
        </div>
        <hr />
        <div className="results">
          {saveData.map((item, idx) => (
            <div key={idx} dangerouslySetInnerHTML={{ __html: item }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
