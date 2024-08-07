
const Maincontent = () => {
  const date = new Date();
  console.log(date);

  return (
    <div className='w-[60%] h-[450px] m-auto bg-red-300 mt-[2rem] rounded-xl py-[1rem] px-[1.5rem]'>
        {/* for the top div */}
        <div className="h-[80%] w-full flex flex-row">
            {/* top-left div */}
            <div className="w-[35%] h-full bg-green-300">
            
            </div>
            {/* top-right div */}
            <div className="w-[65%] h-full  bg-purple-300">

            </div>
        </div>
        {/* for the bottom div */}
        <div className="h-[20%] w-full bg-blue-300">
        </div>
    </div>
  )
}

export default Maincontent