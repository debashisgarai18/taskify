import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SigninImg from "../assets/signin_img.webp";
import PropTypes from "prop-types";

const Signin = ({username, passUser}) => {
  
  // states
  const [isVisible, setisVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePwdVisiblity = () => {
    setisVisible(!isVisible);
  };
  const nav = useNavigate();

  // function to handle thte submit feature
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check whether the fields are empty or not
    if(!email || !password) {
      alert ("The signin input fields cannot be empty | Kindly fill to proceed !!");
      return;
    }

    // data to be pushed to generate the jwtoken for the signin
    const signinData = {
      uname : email,
      pwd : password
    }

    const res = await fetch('http://localhost:3000/user/signin', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(signinData),
      credentials : 'include'
    })

    if(res.status === 200){
      if(username) passUser(username);
      else{
        const name = await res.json();
        passUser(name);
      }
      nav("/landing");
      alert("You are signed in successfully!!");
    }
    else{
      alert('There is some issue in signing you in!!');
      return; 
    }

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
            {
              username && <div className="w-full text-left pt-[1rem]">Welcome <span className="font-bold tracking-wide">{username}</span>, Kindly, <span className="text-[#f37e6c] underline cursor-pointer" onClick={handleSubmit}>login</span> to proceed!!!</div>
            }
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
          <div className="w-[50%] max-h-[calc(100% - 7rem)">
            <img src={SigninImg} alt="Image not loaded" />
          </div>
        </div>
      </div>
    </div>
  );
};

Signin.propTypes = {
  username : PropTypes.string,
  passUser : PropTypes.func

}
export default Signin;
