import { first151Pokemon, getFullPokedexNumber } from "../utils/index";
import { useState } from "react";

export default function Sidenav({
  setSelectedPokemon,
  showSideMenu,
  handletogglemenu,
}) {
  const [search, setsearch] = useState("");

  const filteredpoke = first151Pokemon.filter((ele, eleindex) => {
    if (getFullPokedexNumber(eleindex).includes(search.toLowerCase())) {
      return true;
    }

    if (ele.toLowerCase().includes(search)) {
      return true;
    }

    return false;
  });

  return (
    <nav className={`scrollbar-hidden ${!showSideMenu ? "open" : ""}`}>
      <div className={`header scrollbar-hidden ${!showSideMenu ? "open" : ""}`}>
        <button>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className="header">
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input
        value={search}
        type="text"
        onChange={(e) => {
          setsearch(e.target.value);
        }}
        placeholder="Eg: 001 or Bulbasaur..."
      />

      {filteredpoke.map((pokemon, index) => (
        <button
          className={"nav-card"}
          key={index}
          onClick={() => setSelectedPokemon(pokemon)}
        >
          {getFullPokedexNumber(first151Pokemon.indexOf(pokemon))} {pokemon}
        </button>
      ))}
    </nav>
  );
}
