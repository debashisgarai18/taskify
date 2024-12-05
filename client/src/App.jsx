import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
