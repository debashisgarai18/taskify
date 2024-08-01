import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SignupImg from "../assets/signup_image.jpg";
import PropTypes from "prop-types";

const Signup = ({ passUser }) => {
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

  // function for the onsubmit of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check whether the input fields are empty or not
    if (!name || !email || !password) {
      alert("The signup input Fields cannot be empty !! Please enter to proceed !! ");
      return;
    }

    // data for the endpoint
    const userData = {
      name: name,
      uname: email,
      pwd: password,
    };

    // posting the data to the signup endpoint in the backend
    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 200) {
      passUser(name);
      nav("/signin");
      alert("The user is created successfully!!");
    } else {
      alert("The user cannot be created | Check the credentials !!");
      return;
    }

    // resetting all the input fieds after each submit
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-gull bg-white">
      <div className="w-[50%] h-full m-auto">
        <nav className="text-2xl font-bold tracking-widest uppercase h-[4rem] w-full flex items-center">
          taskify
        </nav>
        <div className="w-full h-[calc(100%-4rem)] flex flex-row pt-[7rem]">
          {/* left-part -> with name, username and password */}
          <div className="w-[50%] max-h-[calc(100% - 7rem)]">
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
          <div className="w-[50%] max-h-[calc(100% - 7rem)">
            <img src={SignupImg} alt="Image not loaded" />
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  passUser: PropTypes.func,
};

export default Signup;
