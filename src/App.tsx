import React from "react";
import { useState } from "react";
import Pokeball from "./components/Pokeball/Pokeball";
import PokedexBorder from "./components/Pokedex/PokedexBorder";
import PokedexScreen from "./components/Pokedex/PokedexScreen";

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (click: boolean) => {
    setIsClicked(!click);
  }

  return (
    isClicked 
      ? <>    
          <PokedexBorder />
          <PokedexScreen />
        </>
      : <Pokeball onClick={handleClick}/>
  );
}

export default App;
