
import { Outlet } from "react-router-dom";
import NavegationAll from "../Elements/NavegationAll";

const Navegacao = () => {
  return (
    <>
      <div className="flex flex-col mx-10 mt-3 mb-4">
        <NavegationAll />

        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navegacao;
