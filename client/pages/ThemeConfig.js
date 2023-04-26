import { createGlobalStyle} from "styled-components"

export const lightTheme = {
  body: '#d1d1e9',
  text: '#2b2c34',
  toggleBorder: '#FFF',
  background: '#d1d1e9',
}

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`