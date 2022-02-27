import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --pokeball-inactive: rgb(150, 28, 28);
    --pokeball-active: rgb(187, 29, 29);
    --pokeball-center-inactive: rgb(178, 34, 34);
    --pokeball-center-active: rgb(205, 35, 35);
    --background: rgb(22, 22, 22);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: rgb(65, 65, 65);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    background-color: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
  }
`
export default GlobalStyles
