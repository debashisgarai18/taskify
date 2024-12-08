import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SigninImg from "../assets/signin_img.webp";
import PropTypes from "prop-types";
import { BACKEND_URL } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingContext } from "../../context";
import Loader from "./Loader";

const Signin = () => {
  // states
  const [isVisible, setisVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, setLoading } = useContext(LoadingContext);
  const nav = useNavigate();

  const handlePwdVisiblity = () => {
    setisVisible(!isVisible);
  };

  // check for the me endpoint
  useEffect(() => {
    (async function check() {
      if (localStorage.getItem("token")) {
        try {
          setLoading((prev) => !prev);
          const resp = await axios.get(`${BACKEND_URL}user/me`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (resp) {
            setLoading((prev) => !prev);
            toast.success("User is already signed in");
            nav(`/landing?user=${resp.data.user}`);
          }
        } catch (err) {
          setLoading((prev) => !prev);
          console.log(`Some error : ${err.response.data.message}`);
        }
      }
    })();
  }, [nav, setLoading]);

  // function to handle thte submit feature
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check whether the fields are empty or not
    if (!email || !password) {
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

    // data to be pushed to generate the jwtoken for the signin
    const signinData = {
      uname: email,
      pwd: password,
    };

    try {
      setLoading((prev) => !prev);
      const resp = await axios.post(`${BACKEND_URL}user/signin`, signinData);
      if (resp) {
        localStorage.setItem("token", `Bearer ${resp.data.token}`);
        toast.success("User Signed In");
        setLoading((prev) => !prev);
        nav(`/landing?user=${resp.data.user}`);
      }
    } catch (err) {
      setLoading((prev) => !prev);
      toast.error(`Error : ${err.response.data.message}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full md:w-[50%] h-full m-auto md:px-0 px-[1rem]">
        <nav
          className="text-2xl font-bold tracking-widest uppercase h-[4rem] w-full flex items-center cursor-pointer"
          onClick={() => nav("/")}
        >
          taskify
        </nav>
        <div className="w-full h-[calc(100%-4rem)] flex flex-row pt-[7rem] gap-[1rem]">
          {/* left-part -> with username and password */}
          <div className="w-full md:w-[50%] ">
            <div className="w-full text-3xl font-bold tracking-wider">
              Sign In
            </div>
            <div className="w-full mt-[2rem]">
              <form
                action="submit"
                className="flex flex-col gap-[0.5rem] px-[0.5rem]"
                onSubmit={handleSubmit}
              >
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Email
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none focus:border-none"
                    placeholder="Enter you email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Password
                  </label>
                  <div className="w-full flex flex-row justify-between">
                    <input
                      type={isVisible ? "text" : "password"}
                      className="focus:outline-none focus:border-none"
                      placeholder="Enter you password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  Sign In
                </button>
              </form>
              <div className="w-full text-center text-xs mt-[2rem]">
                Don&apos;t have an account?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => nav("/signup")}
                >
                  Go to sign up
                </span>
              </div>
            </div>
          </div>
          {/* right-part -> with one image */}
          <div className="w-[50%] hidden md:block ">
            <img src={SigninImg} alt="Image not loaded" />
          </div>
        </div>
      </div>
    </div>
  );
};

Signin.propTypes = {
  username: PropTypes.string,
  passUser: PropTypes.func,
};
export default Signin;
