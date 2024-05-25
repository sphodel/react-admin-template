import page_404 from "./assert/Scarecrow.png";

const NotFound = () => {
  return (
    <div className={"overflow-hidden"}>
      <div
        className={
          " flex  flex-col items-center justify-center h-screen w-screen"
        }
      >
        <h1 className={"mt-4 text-4xl font-extrabold flex justify-center"}>
          404 Not found
        </h1>
        <div>
          The page you are looking for might be removed or is temporarily
          unavailable
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img src={page_404} alt={""} className={"w-96"} />
      </div>
    </div>
  );
};
export default NotFound;
