import PropTypes from "prop-types";

export default function MobileView({ task, desc, add }) {
  return (
    <div className="fixed w-full h-full backdrop-blur-md left-0 top-0">
      <div className="fixed w-[70%] bg-white rounded-xl border-2 px-[1.75rem] py-[1.5rem] right-[1rem] bottom-[9.75rem] flex flex-col gap-[1rem] shadow-lg">
        <div className="text-xl font-medium">Add Task</div>
        <input
          type="text"
          placeholder="Enter the task"
          className="w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
          onChange={(e) => task(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the description"
          className="w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
          onChange={(e) => desc(e.target.value)}
        />
        <button
          className="cursor-pointer rounded-lg font-medium text-white text-xl py-[0.5rem] bg-[#5C9967] active:translate-y-[1px]"
          onClick={add}
        >
          Add
        </button>
      </div>
    </div>
  );
}

MobileView.propTypes = {
  add: PropTypes.func,
  desc: PropTypes.func,
  task: PropTypes.func,
};
