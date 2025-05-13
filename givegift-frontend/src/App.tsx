import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppContext } from './context'
import { AppRouter } from './components/AppRouter/AppRouter'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContext>
  )
}

export default App
