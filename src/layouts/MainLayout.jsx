import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import AnnouncementBar from "../components/shared/AnnouncementBar";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
