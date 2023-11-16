import { Link, useNavigate } from "react-router-dom";
import companyLogo from "../assets/navbar-logo.png";
import Swal from "sweetalert2";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const modalLogout = async (event) => {
    event.preventDefault();
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      return handleLogout();
    }
  };

  return (
    <>
      <div className="fixed w-full top-0 z-50">
        <nav className="flex bg-violet-950 justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <img src={companyLogo} className="w-14" />
          </div>
          <div className="flex gap-4 ">
            <Link to="/" className="p-2 hover:bg-lime-500">
              Home
            </Link>
          </div>
          <div>
            <button
              onClick={(event) => modalLogout(event)}
              className="btn bg-lime-500 hover:bg-lime-700"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
