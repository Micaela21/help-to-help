import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Componente para buscar determinados productos
export default function SearchBar() {
  const history = useHistory()
  const [state, setState] = useState("");

  function handleChange(e) {
    setState(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    history.push(`/search/${state}`)
  }

  return (
      <form className="searchBarContainer">
        <div>
          <input type="text" placeholder="Buscar..." value={state} onChange={handleChange} className="searchBar" />
          <button type="submit" className="searchBarButton" onClick={handleClick}>
            <img src="./img/loupe.png" alt="lupa" />
          </button>
        </div>
      </form>
  );
}