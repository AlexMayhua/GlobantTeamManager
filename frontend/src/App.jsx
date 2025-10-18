import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { get } from './api/http'

function App() {
  const [count, setCount] = useState(0)
  const [health, setHealth] = useState(null)
  useEffect(() => { get('/health').then(setHealth).catch(()=>setHealth({error:true})) }, [])

  return (
    <div>
      Hola
    </div>
  )
}

export default App
