import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SignupImg from "../assets/signup_image.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { useEffect } from "react";

const Signup = () => {
  // states
  const [isVisible, setisVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // function to handle the visible of the password
  const handlePwdVisiblity = () => {
    setisVisible(!isVisible);
  };

  // check for the me endpoint
  useEffect(() => {
    (async function check() {
      if (localStorage.getItem("token")) {
        try {
          const resp = await axios.get(`${BACKEND_URL}user/me`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (resp) {
            toast.success("User is already signed in");
            nav(`/landing?user=${resp.data.user}`);
          }
        } catch (err) {
          console.log(`Some error : ${err.response.data.message}`);
        }
      }
    })();
  }, [nav]);

  // function for the onsubmit of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check whether the input fields are empty or not
    if (!name || !email || !password) {
      // toast(
      //   "The signup input fields cannot be empty !! Please enter to proceed !! "
      // );
      toast.error("The input fields cannot be empty  ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // data for the endpoint
    const userData = {
      name: name,
      uname: email,
      pwd: password,
    };

    try {
      const resp = await axios.post(`${BACKEND_URL}user/signup`, userData);
      if (resp) {
        localStorage.setItem("token", `Bearer ${resp.data.token}`);
        toast.success("User Signed Up");
        nav(`/landing?user=${resp.data.user}`);
      }
    } catch (err) {
      toast(`Error : ${err}`);
    }
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full px-[1rem] md:px-0 md:w-[50%] h-full m-auto">
        <nav
          className="text-2xl font-bold tracking-widest uppercase h-[4rem] w-full flex items-center cursor-pointer"
          onClick={() => nav("/")}
        >
          taskify
        </nav>
        <div className="w-full h-[calc(100%-4rem)] flex flex-row pt-[7rem]">
          {/* left-part -> with name, username and password */}
          <div className="md:w-[50%] w-full">
            <div className="w-full text-3xl font-bold tracking-wider">
              Sign Up
            </div>
            <div className="w-full mt-[2rem]">
              <form
                action="submit"
                className="flex flex-col gap-[0.5rem] px-[0.5rem]"
                onSubmit={handleSubmit}
              >
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none focus:border-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter you name..."
                  />
                </div>
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Email
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none focus:border-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter you email..."
                  />
                </div>
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Password
                  </label>
                  <div className="w-full flex flex-row justify-between">
                    <input
                      type={isVisible ? "text" : "password"}
                      value={password}
                      className="focus:outline-none focus:border-none"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter you password..."
                    />
                    {!isVisible ? (
                      <FaEyeSlash
                        className="cursor-pointer"
                        onClick={handlePwdVisiblity}
                      />
                    ) : (
                      <FaEye
                        className="cursor-pointer"
                        onClick={handlePwdVisiblity}
                      />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#ea5740] w-full py-[0.5rem] text-xl font-bold rounded-md shadow-md hover:bg-[#ee523a] active:translate-y-[1px] text-white mt-[1rem]"
                >
                  Sign up
                </button>
              </form>
              <div className="w-full text-center text-xs mt-[2rem]">
                Already signed up?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => nav("/signin")}
                >
                  Go to sign in
                </span>
              </div>
            </div>
          </div>
          {/* right-part -> with one image */}
          <div className="w-[50%] hidden md:block">
            <img src={SignupImg} alt="Image not loaded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
