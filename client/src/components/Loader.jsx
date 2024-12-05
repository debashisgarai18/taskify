import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-[1rem]">
      <CircularProgress
        size={"6rem"}
        sx={() => ({
          color: "#f37e6c",
        })}
      />
      <div className="text-[2rem] font-medium md:text-[3rem]">Loading...</div>
    </div>
  );
}
