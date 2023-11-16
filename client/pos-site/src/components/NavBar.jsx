import companyLogo from "../assets/navbar-logo.png";

export default function NavBar() {
  return (
    <>
      <div>
        <nav className="flex justify-between bg-blue-950 text-white items-center px-4 py-2">
          <div className="">
            <img src={companyLogo} className="w-10" />
          </div>
          <div className="flex gap-4">
            <a href="">Add Order</a>
            <a href="">History</a>
          </div>
          <div>
            <button className="btn">Logout</button>
          </div>
        </nav>
      </div>
    </>
  );
}
