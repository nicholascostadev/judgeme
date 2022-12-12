import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import theme from '../styles/theme'

interface UserContextProps {
  username: string
  setUsername: (username: string) => void
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
)

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>('')

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ username, setUsername }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
