import { Link } from "react-router-dom";
import cashierIcon from "../assets/cashier-icon.png";

export default function HomePage() {
  return (
    <>
      <div className="my-10 flex flex-col">
        <div className="text-center m-10 p-10">
          <h1 className="text-4xl">POS Feature</h1>
        </div>
        <div className="px-10 flex justify-center">
          <div className="bg-violet-950 rounded-t-full card card-compact w-96 shadow-xl text-center items-center">
            <figure>
              <img src={cashierIcon} alt="Cashier" />
            </figure>
            <div className="card-body ">
              <h2 className="card-title justify-center">Cashier</h2>
              <div className="card-actions justify-center">
                <Link to="/cashier" className="btn btn-secondary">
                  New Transaction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
