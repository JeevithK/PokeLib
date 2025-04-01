import {useState, useEffect}  from "react";
import {getPokedexNumber, getFullPokedexNumber, first151Pokemon}  from "../utils/index";
import Typecard from './Typecard';
import { Modal } from "./Modal";

export default function Pokecard({ selectedPokemon }) {
  const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setskill] = useState("")
    const [loadingskill, setloadingskill] = useState(false)
    
    
    
    const { name, height, abilities, stats, types, moves, sprites } = pokemonData || {}
    


    const imgList = Object.keys(sprites || {}).filter((val) => {
        if (!sprites[val])
        {
            return false
        }

        if (["versions", "other"].includes(val))
        {
            return false
        }
        return true
    })

    async function fetchmovedata(move, moveurl)
    {
        if (loadingskill || !localStorage || !move || !moveurl) { return }
        
        let c = {}
        
        if (localStorage.getItem("pokemon-moves"))
        {
              try {
                c = JSON.parse(localStorage.getItem("pokemon-moves"));
              } catch (e) {
                console.error("Failed to parse moves cache", e);
                c = {};
              }
        }

        if (move in c)
        {
            setskill(c)
            console.log("found move in cache")
            return 
        }

        try {
            const res = await fetch(moveurl);  
            const data = await res.json();
            console.log("fetched data", data)
            
            const desc = data?.flavor_text_entries.filter(
                val => {
                    return val.version_group.name = "firered-leafgreen"
                }
            )[0]?.flavor_text

            const skilldata = { name: move, desc }
            
            setskill(skilldata);

            c[move] = skilldata
            
            localStorage.setItem("pokemon-moves", JSON.stringify(c));

        }
        catch (error)
        {
            console.log(error)
        }
        finally {
            setloadingskill(false)
        }

         


    }

    useEffect(() => {
      

      if (loading || !localStorage) { return }
      
      let cache = {}
      
      if (localStorage.getItem('pokedex'))
      {
          cache = JSON.parse(localStorage.getItem('pokedex'))
          
      }
      
      if (selectedPokemon in cache)
      {
          setPokemonData(cache[selectedPokemon])
          console.log("it is already there!!")
          console.log(cache)
          return
      }


        
        
        async function fetchpokemondata()
        {
            console.log("Fetching the data!!");

            setLoading(true)

            try {
                const baseurl = `https://pokeapi.co/api/v2/`;
                const suffix = 'pokemon/' + selectedPokemon;
                const finalurl = baseurl + suffix
                
                const res = await fetch(finalurl);
                const data = await res.json();

                setPokemonData(data);

                console.log("fetched the data")

                cache[selectedPokemon] = data
                
                localStorage.setItem("pokedex", JSON.stringify(cache))
                
            }

            catch(error) {
                console.log(error)
            }

            finally
            {
                setLoading(false)
            }
        }


        console.log(cache);
      

    fetchpokemondata();
  }, [selectedPokemon]);
    
    console.log(pokemonData);

  if (loading) return <div><h2>Loading...</h2></div>;
  if (!pokemonData) return <div>Select a Pokémon</div>;

  return (
    <div className="poke-card">
      {skill && (
        <Modal
          handleclosemodal={() => {
            setskill(null);
          }}
        >
          <div>
            <h4 className="text-gradient"> Name </h4>
            <h2>{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h4 className="text-gradient">Description</h4>
            <h2>{skill.desc.replaceAll("-", " ")}</h2>
          </div>
        </Modal>
      )}
      <div>
        <h3>
          #{getFullPokedexNumber(first151Pokemon.indexOf(selectedPokemon))}
        </h3>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeobj, typeindex) => (
          <Typecard key={typeindex} type={typeobj?.type?.name}></Typecard>
        ))}
      </div>

      <img
        className="default-img"
        src={
          "/pokemon/" +
          getFullPokedexNumber(first151Pokemon.indexOf(selectedPokemon)) +
          ".png"
        }
        alt={`${name} - large-img`}
      />
      <p>Type: {pokemonData.types.map((t) => t.type.name).join(", ")}</p>
      <div className="img-container">
        {imgList.map((spriteUrl, spriteIndex) => {
          const imgUrl = sprites[spriteUrl];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteUrl}`}
            />
          );
        })}
      </div>

      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statobj, statindex) => {
          const { stat, base_stat } = statobj;
          return (
            <div key={statindex} className="stat-item">
              <p style={{ fontWeight: "bold" }}> {stat?.name} - </p>
              <h5>{base_stat}</h5>
            </div>
          );
        })}
      </div>

      <h2>Moves</h2>

      <div className="pokemon-move-grid">
        {moves.map((moveobj, moveindex) => {
          return (
            <button
              className="buttoncard  pokemonmove"
              key={moveindex}
              onClick={() => {
                fetchmovedata(moveobj?.move?.name, moveobj?.move?.url);
              }}
            >
              <p>{moveobj?.move?.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
