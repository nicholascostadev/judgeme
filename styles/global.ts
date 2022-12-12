import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
    background: #101113;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
