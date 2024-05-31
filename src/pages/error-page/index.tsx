import { Button } from "antd";
import page_404 from "./assert/Scarecrow.png";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={" flex  flex-col items-center justify-center h-screen"}>
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
  );
};
export default ErrorPage;
