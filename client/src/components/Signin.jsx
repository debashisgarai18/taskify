import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SigninImg from "../assets/signin_img.webp"

const Signin = () => {
  const [isVisible, setisVisible] = useState(false);

  const handlePwdVisiblity = () => {
    setisVisible(!isVisible);
  };
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen w-gull bg-white">
      <div className="w-[50%] h-full m-auto">
        <nav className="text-2xl font-bold tracking-widest uppercase h-[4rem] w-full flex items-center">
          taskify
        </nav>
        <div className="w-full h-[calc(100%-4rem)] flex flex-row pt-[7rem] gap-[1rem]">
          {/* left-part -> with username and password */}
          <div className="w-[50%] max-h-[calc(100% - 7rem)]">
            <div className="w-full text-3xl font-bold tracking-wider">
              Sign In
            </div>
            <div className="w-full mt-[2rem]">
              <form
                action="submit"
                className="flex flex-col gap-[0.5rem] px-[0.5rem]"
                onClick={handleSubmit}
              >
                <div className="w-full border-[0.5px] rounded-md border-gray-300 flex flex-col px-[0.5rem] bg-white py-[0.3rem]">
                  <label className="text-xs font-semibold tracking-wide">
                    Email
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none focus:border-none"
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
                      className="focus:outline-none focus:border-none"
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
          <div className="w-[50%] max-h-[calc(100% - 7rem)">
            <img src={SigninImg} alt="Image not loaded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
