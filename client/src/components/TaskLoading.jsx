import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function TaskLoading() {
  return (
    <div className="w-full flex mt-[2rem] flex-col items-center justify-center gap-[1rem]">
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={() => ({
            color: "#f37e6c",
          })}
        />
      </Box>
      <div className="w-full text-center font-medium">Loding Tasks...</div>
    </div>
  );
}
