import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-2xl p-4 bg-red-300'>
        this is going to be Taskify
      </div>
    </>
  )
}

export default App
