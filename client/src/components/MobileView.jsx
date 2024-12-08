export default function MobileView() {
  return (
    <div className="w-full h-screen backdrop-blur-md absolute top-0 left-0">
      <div className="fixed w-[70%] bg-white rounded-xl border  px-[1.75rem] py-[1.5rem] right-[1rem] bottom-[15.75rem] flex flex-col gap-[1rem]">
        <div className="text-xl font-medium">Add Task</div>
        <input
          type="text"
          placeholder="Enter the task"
          className=" w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
        />
        <input
          type="text"
          placeholder="Enter the description"
          className=" w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
        />
        <button className=" cursor-pointer rounded-lg font-medium text-white text-xl py-[0.5rem] bg-[#5C9967] active:translate-y-[1px]">
          Add
        </button>
      </div>
    </div>
  );
}
