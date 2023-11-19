import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}
