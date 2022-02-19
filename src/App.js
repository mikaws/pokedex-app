import { useState } from "react";
import Pokeball from "./components/Pokeball/Pokeball";
import PokedexBorder from "./components/Pokedex/PokedexBorder";
import PokedexScreen from "./components/Pokedex/PokedexScreen";

function App() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (click) => {
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
