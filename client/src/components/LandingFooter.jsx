import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const LandingFooter = () => {
  return (
    <div className=" bg-[#F2EAEA] h-[4rem] w-full fixed bottom-0 flex items-center justify-between">
      <div className="h-full w-full md:px-0 px-[1rem] md:w-[60%] m-auto flex items-center justify-between">
        <div className="text-[10px] tracking-widest capitalise">
          Taskify | @All rights reserved
        </div>
        <div className="flex items-center justify-around gap-[1.5rem]">
          <a href="https://www.linkedin.com/in/deba018/">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/debashisgarai18">
            <FaGithub />
          </a>
          <a href="https://x.com/deba018_">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/deba0_018/">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
