import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing'
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useState } from 'react';

// (<Route path = "/" element = {<Layout />}>
//   {/* index basically refers that if "/" is hit then it should fetch Home and default will be that only */}
//   <Route index element = {<Home />} />
//   <Route path='/signin' element = {<Signin />} />
//   <Route path='/signup' element = {<Signup />} />
// </Route>)

function App() {
  const [user, setUser] = useState("");

  return (
      <BrowserRouter>
      <Routes>  
        <Route path = "/" element = {<Home />} />
        <Route path = "/signup" element = {<Signup passUser = {setUser}/>} />
        <Route path = "/signin" element = {<Signin username = {user} passUser = {setUser}/>} />
        <Route path = "/landing" element = {<Landing username = {user}/>} />
      </Routes>
      </BrowserRouter>                            
  )
}

export default App
