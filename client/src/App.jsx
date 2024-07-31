import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing'
import Layout from './components/Layout';
import Signin from './components/Signin';
import Signup from './components/Signup';

// (<Route path = "/" element = {<Layout />}>
//   {/* index basically refers that if "/" is hit then it should fetch Home and default will be that only */}
//   <Route index element = {<Home />} />
//   <Route path='/signin' element = {<Signin />} />
//   <Route path='/signup' element = {<Signup />} />
// </Route>)

function App() {
  return (
      <BrowserRouter>
      <Routes>  
        <Route path = "/" element = {<Home />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/signin" element = {<Signin />} />
        <Route path = "/landing" element = {<Landing />} />
      </Routes>
      </BrowserRouter>                            
  )
}

export default App
