import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";
import { LoadingContext } from "../context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setLoading] = useState(false);
  return (
    <BrowserRouter>
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </LoadingContext.Provider>
    </BrowserRouter>
  );
}

export default App;
