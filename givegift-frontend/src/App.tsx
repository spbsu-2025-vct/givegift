import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppContext } from './context'
import { AppRouter } from './components/AppRouter/AppRouter'
import { giveGiftTheme } from './muiThemes/theme'
import { ThemeProvider } from '@emotion/react'

function App() {
  return (
    <ThemeProvider theme={giveGiftTheme}>
      <AppContext>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppContext>
    </ThemeProvider>
  )
}

export default App
