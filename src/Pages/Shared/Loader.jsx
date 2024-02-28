import { PacmanLoader } from "react-spinners";

const Loader = () => {

  return (
    <div className="flex justify-center items-center w-full lg:h-full h-screen">
      <PacmanLoader color="#36d7b7" />
    </div>
  )
};

export default Loader