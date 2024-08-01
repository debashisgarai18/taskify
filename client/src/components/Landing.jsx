import { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [name, setName] = useState("");
  const nav = useNavigate();
  const getUserData = async () => {
    const res = await fetch("http://localhost:3000/user/landing",{
      method : 'GET',
      credentials : 'include'
    });
    const jsonConData = await res.json();

    // check if someone directly accessed the /landing endpoint without the jwt token then it should redirect to the signin page to sign in
    if(jsonConData.message === "No token Provided!!") {
        return;
    }
    // else should set the name of the user
    else{
      setName(jsonConData.name);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  const handleSignIn = () => {
    nav("/signin");
  }
  return (
    <>
    { 
      name ? <div>Hi {name}, thanks for coming!!</div> :
      <div className='w-full text-center font-bold tracking-wider text-5xl'>Please Signin to enter <span className='text-[#f37e6c] underline cursor-pointer' onClick={handleSignIn}>Sign in</span></div>
    }
    </>
  )
}
export default Landing