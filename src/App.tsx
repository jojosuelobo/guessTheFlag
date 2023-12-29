import './App.sass'

// Routes
import { AppRoutes } from './routes/AppRoutes'

// Context
import { Context } from './context/context'

function App() {

  return (
    <>
      <Context>
        <AppRoutes />
      </Context>
    </>
  )
}

export default App
