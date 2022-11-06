import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App uk-container">
      <div className="uk-navbar-container uk-navbar-transparent" uk-navbar>
          <div className="uk-navbar-left">
              <div className="uk-navbar-item">Mortgage Calculator</div>
          </div>
      </div>
    </div>
  )
}

export default App
