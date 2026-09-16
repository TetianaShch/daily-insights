import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="app">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
