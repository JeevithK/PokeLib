import { useState } from "react";

import Sidenav from "./components/Sidenav";
import  Pokecard from "./components/Pokecard";
import Header from "./components/Header";
export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("Bulbasaur");
  const [showsidemenu, setshowsidemenu] = useState(true);

  function handletogglemenu() {
    setshowsidemenu(!showsidemenu);
  }

  return (
    <>
      <Header handletogglemenu={handletogglemenu} />
      <Sidenav
        setSelectedPokemon={setSelectedPokemon}
        showsidemenu={showsidemenu} handletogglemenu={handletogglemenu }
      />
      <Pokecard selectedPokemon={selectedPokemon} />
    </>
  );
}
